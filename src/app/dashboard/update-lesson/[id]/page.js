"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/AuthProvider";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const CATEGORIES = ["Personal Growth", "Career", "Relationships", "Mindset", "Mistakes Learned"];
const EMOTIONAL_TONES = ["Motivational", "Sad", "Realization", "Gratitude"];

const UpdateLessonPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { isPremium } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: CATEGORIES[0],
    emotionalTone: EMOTIONAL_TONES[0],
    visibility: "Public",
    accessLevel: "Free",
    image: "",
  });

  useEffect(() => {
    apiFetch(`/api/lessons/${id}`)
      .then((lesson) => {
        setFormData({
          title: lesson.title || "",
          description: lesson.description || "",
          category: lesson.category || CATEGORIES[0],
          emotionalTone: lesson.emotionalTone || EMOTIONAL_TONES[0],
          visibility: lesson.visibility || "Public",
          accessLevel: lesson.accessLevel || "Free",
          image: lesson.image || "",
        });
      })
      .catch(() => toast.error("Failed to load lesson"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("Title and description are required");
      return;
    }
    setSaving(true);
    try {
      await apiFetch(`/api/lessons/${id}`, {
        method: "PATCH",
        body: JSON.stringify(formData),
      });
      toast.success("Lesson updated successfully!");
      router.push("/dashboard/my-lessons");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold mb-2">Update Lesson</h1>
      <p className="text-base-content/60 text-sm mb-8">Edit your lesson details below.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="form-control">
          <label className="label"><span className="label-text font-medium">Lesson Title</span></label>
          <input name="title" type="text" className="input input-bordered w-full" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text font-medium">Full Description / Story</span></label>
          <textarea name="description" rows={6} className="textarea textarea-bordered w-full" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Category</span></label>
            <select name="category" className="select select-bordered w-full" value={formData.category} onChange={handleChange}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Emotional Tone</span></label>
            <select name="emotionalTone" className="select select-bordered w-full" value={formData.emotionalTone} onChange={handleChange}>
              {EMOTIONAL_TONES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Visibility</span></label>
            <select name="visibility" className="select select-bordered w-full" value={formData.visibility} onChange={handleChange}>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Access Level</span></label>
            <div className="tooltip w-full" data-tip={!isPremium ? "Upgrade to Premium to change access level" : ""}>
              <select name="accessLevel" className="select select-bordered w-full" value={formData.accessLevel} onChange={handleChange} disabled={!isPremium}>
                <option value="Free">Free</option>
                {isPremium && <option value="Premium">Premium</option>}
              </select>
            </div>
          </div>
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text font-medium">Image URL (Optional)</span></label>
          <input name="image" type="text" className="input input-bordered w-full" value={formData.image} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={saving}>
          {saving ? <span className="loading loading-spinner loading-sm"></span> : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default UpdateLessonPage;