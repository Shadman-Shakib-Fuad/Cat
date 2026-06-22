"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/users")
      .then(setUsers)
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  const handleRoleToggle = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    try {
      await apiFetch(`/api/users/${user._id}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role: newRole }),
      });
      setUsers((prev) => prev.map((u) => u._id === user._id ? { ...u, role: newRole } : u));
      toast.success("User role updated");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user account?")) return;
    try {
      await apiFetch(`/api/users/${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-2">Manage Users</h1>
      <p className="text-base-content/60 text-sm mb-8">View and manage all registered users.</p>

      <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Premium</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t border-base-300">
                <td className="font-medium">{u.name}</td>
                <td className="text-sm text-base-content/60">{u.email}</td>
                <td><span className={`badge ${u.role === "admin" ? "badge-secondary" : "badge-ghost"}`}>{u.role}</span></td>
                <td><span className={`badge ${u.isPremium ? "badge-warning" : "badge-ghost"}`}>{u.isPremium ? "Premium" : "Free"}</span></td>
                <td className="text-sm text-base-content/60">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => handleRoleToggle(u)} className="btn btn-xs btn-outline btn-primary">
                      {u.role === "admin" ? "Demote" : "Make Admin"}
                    </button>
                    <button onClick={() => handleDelete(u._id)} className="btn btn-xs btn-outline btn-error">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsersPage;