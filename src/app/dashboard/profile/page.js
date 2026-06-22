"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/AuthProvider";
import LessonCard from "@/components/shared/LessonCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { FaStar } from "react-icons/fa";

const ProfilePage = () => {
  const { user, isPremium, updateUser } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiFetch("/api/lessons/my-lessons")
      .then((data) => setLessons(data.filter((l) => l.visibility === "Public")))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setSaving(true);
    try {
      await apiFetch(`/api/users/${user.id}/profile`, {
        method: "PATCH",
        body: JSON.stringify({ name, photoURL: photo }),
      });
      updateUser({ ...user, name, photoURL: photo });
      setEditing(false);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-8">My Profile</h1>

      <div className="card bg-base-100 shadow-sm border border-base-300 p-8 max-w-xl mb-10">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={user?.photoURL || "https://i.pravatar.cc/150?img=12"}
            alt={user?.name}
            className="w-20 h-20 rounded-full ring ring-primary ring-offset-2"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{user?.name}</h2>
              {isPremium && (
                <span className="badge badge-warning gap-1 font-bold">
                  <FaStar size={10} /> Premium
                </span>
              )}
            </div>
            <p className="text-base-content/60 text-sm">{user?.email}</p>
            <div className="flex gap-4 mt-2 text-sm text-base-content/70">
              <span>{lessons.length} public lessons</span>
            </div>
          </div>
        </div>

        {editing ? (
          <div className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Display Name</span></label>
              <input type="text" className="input input-bordered w-full" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Photo URL</span></label>
              <input type="text" className="input input-bordered w-full" value={photo} onChange={(e) => setPhoto(e.target.value)} />
            </div>
            <div className="flex gap-3">
              <button onClick={handleSave} className="btn btn-primary" disabled={saving}>
                {saving ? <span className="loading loading-spinner loading-sm"></span> : "Save Changes"}
              </button>
              <button onClick={() => setEditing(false)} className="btn btn-ghost">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setEditing(true)} className="btn btn-outline btn-primary w-full">
            Edit Profile
          </button>
        )}
      </div>

      <h2 className="text-xl font-bold mb-6">My Public Lessons</h2>
      {lessons.length === 0 ? (
        <p className="text-base-content/60">No public lessons yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;