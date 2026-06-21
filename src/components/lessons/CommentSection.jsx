"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const CommentSection = ({ comments = [] }) => {
  const [text, setText] = useState("");
  const user = null; // TODO: Better Auth বসার পর real user

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.info("Please log in to comment");
      return;
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
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>

      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-sm text-base-content/60">Be the first to comment on this lesson.</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <img src={c.photo} alt={c.user} className="w-10 h-10 rounded-full" />
            <div className="bg-base-200 rounded-xl px-4 py-2 flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm">{c.user}</span>
                <span className="text-xs text-base-content/50">{c.createdAt}</span>
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