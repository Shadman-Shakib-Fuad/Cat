"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { sampleLessons } from "@/lib/mockData";
import LessonCard from "@/components/shared/LessonCard";
import { FaStar } from "react-icons/fa";

const mockUser = {
  name: "Rafiul Islam",
  email: "rafiul@example.com",
  photoURL: "https://i.pravatar.cc/150?img=12",
  isPremium: false,
  lessonsCreated: 4,
  lessonsSaved: 7,
};

const ProfilePage = () => {
  const [user, setUser] = useState(mockUser);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [photo, setPhoto] = useState(user.photoURL);

  const publicLessons = sampleLessons.filter(
    (l) => l.creator.id === "u1" && l.visibility === "Public"
  );

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setUser((prev) => ({ ...prev, name, photoURL: photo }));
    setEditing(false);
    toast.success("Profile updated");
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-8">My Profile</h1>

      <div className="card bg-base-100 shadow-sm border border-base-300 p-8 max-w-xl mb-10">
        <div className="flex items-center gap-6 mb-6">
          <img src={user.photoURL} alt={user.name} className="w-20 h-20 rounded-full ring ring-primary ring-offset-2" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{user.name}</h2>
              {user.isPremium && (
                <span className="badge badge-warning gap-1 font-bold">
                  <FaStar size={10} /> Premium
                </span>
              )}
            </div>
            <p className="text-base-content/60 text-sm">{user.email}</p>
            <div className="flex gap-4 mt-2 text-sm text-base-content/70">
              <span>{user.lessonsCreated} lessons</span>
              <span>{user.lessonsSaved} saved</span>
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
              <button onClick={handleSave} className="btn btn-primary">Save Changes</button>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {publicLessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;