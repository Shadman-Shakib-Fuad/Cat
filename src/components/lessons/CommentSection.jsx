"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

const CommentSection = ({ comments, setComments, lessonId, user }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.info("Please log in to comment");
      router.push("/login");
      return;
    }
    if (!text.trim()) return;

    setLoading(true);
    try {
      const newComment = await apiFetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ lessonId, text }),
      });
      setComments((prev) => [newComment, ...prev]);
      setText("");
    } catch {
      toast.error("Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder={user ? "Write a comment..." : "Log in to write a comment..."}
          className="input input-bordered flex-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <span className="loading loading-spinner loading-sm"></span> : "Post"}
        </button>
      </form>

      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-sm text-base-content/60">Be the first to comment on this lesson.</p>
        )}
        {comments.map((c) => (
          <div key={c._id} className="flex gap-3">
            <img
              src={c.userId?.photoURL || "https://i.pravatar.cc/150?img=12"}
              alt={c.userId?.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="bg-base-200 rounded-xl px-4 py-2 flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm">{c.userId?.name}</span>
                <span className="text-xs text-base-content/50">{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-sm">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;