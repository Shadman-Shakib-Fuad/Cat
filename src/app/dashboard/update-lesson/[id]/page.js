"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { getLessonById } from "@/lib/mockData";

const CATEGORIES = ["Personal Growth", "Career", "Relationships", "Mindset", "Mistakes Learned"];
const EMOTIONAL_TONES = ["Motivational", "Sad", "Realization", "Gratitude"];

const UpdateLessonPage = ({ params }) => {
  const lesson = getLessonById(params.id);
  const isPremium = false;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: lesson?.title || "",
    description: lesson?.fullDescription || "",
    category: lesson?.category || CATEGORIES[0],
    emotionalTone: lesson?.emotionalTone || EMOTIONAL_TONES[0],
    visibility: lesson?.visibility || "Public",
    accessLevel: lesson?.accessLevel || "Free",
    image: lesson?.image || "",
  });

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-medium text-base-content/60">Lesson not found.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("Title and description are required");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Lesson updated successfully!");
    }, 800);
  };

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

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? <span className="loading loading-spinner loading-sm"></span> : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default UpdateLessonPage;