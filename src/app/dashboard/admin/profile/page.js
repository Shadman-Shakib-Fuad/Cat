"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { MdAdminPanelSettings } from "react-icons/md";

const adminUser = {
  name: "Super Admin",
  email: "admin@digitallifelessons.com",
  photoURL: "https://i.pravatar.cc/150?img=60",
};

const AdminProfilePage = () => {
  const [user, setUser] = useState(adminUser);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [photo, setPhoto] = useState(user.photoURL);

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
      <h1 className="text-2xl font-extrabold mb-8">Admin Profile</h1>

      <div className="card bg-base-100 shadow-sm border border-base-300 p-8 max-w-xl">
        <div className="flex items-center gap-6 mb-6">
          <img src={user.photoURL} alt={user.name} className="w-20 h-20 rounded-full ring ring-secondary ring-offset-2" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <span className="badge badge-secondary gap-1 font-bold">
                <MdAdminPanelSettings /> Admin
              </span>
            </div>
            <p className="text-base-content/60 text-sm">{user.email}</p>
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
          <button onClick={() => setEditing(true)} className="btn btn-outline btn-secondary w-full">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminProfilePage;