"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const CATEGORIES = ["Personal Growth", "Career", "Relationships", "Mindset", "Mistakes Learned"];
const EMOTIONAL_TONES = ["Motivational", "Sad", "Realization", "Gratitude"];

const AddLessonPage = () => {
  const [loading, setLoading] = useState(false);
  const isPremium = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      emotionalTone: form.emotionalTone.value,
      accessLevel: isPremium ? form.accessLevel.value : "Free",
      visibility: form.visibility.value,
      image: form.image.value,
    };

    if (!data.title || !data.description) {
      toast.error("Title and description are required");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Lesson submitted! (DB not connected yet)");
      form.reset();
    }, 800);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold mb-2">Add New Lesson</h1>
      <p className="text-base-content/60 text-sm mb-8">
        Share a life lesson with the community.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="form-control">
          <label className="label"><span className="label-text font-medium">Lesson Title</span></label>
          <input name="title" type="text" placeholder="What did you learn?" className="input input-bordered w-full" required />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text font-medium">Full Description / Story</span></label>
          <textarea name="description" rows={6} placeholder="Tell your story in detail..." className="textarea textarea-bordered w-full" required />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Category</span></label>
            <select name="category" className="select select-bordered w-full">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Emotional Tone</span></label>
            <select name="emotionalTone" className="select select-bordered w-full">
              {EMOTIONAL_TONES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Visibility</span></label>
            <select name="visibility" className="select select-bordered w-full">
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Access Level</span></label>
            <div className="tooltip tooltip-bottom w-full" data-tip={!isPremium ? "Upgrade to Premium to create paid lessons" : ""}>
              <select
                name="accessLevel"
                className="select select-bordered w-full"
                disabled={!isPremium}
              >
                <option value="Free">Free</option>
                {isPremium && <option value="Premium">Premium</option>}
              </select>
            </div>
          </div>
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text font-medium">Image URL (Optional)</span></label>
          <input name="image" type="text" placeholder="https://your-image-url.com" className="input input-bordered w-full" />
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? <span className="loading loading-spinner loading-sm"></span> : "Submit Lesson"}
        </button>
      </form>
    </div>
  );
};

export default AddLessonPage;