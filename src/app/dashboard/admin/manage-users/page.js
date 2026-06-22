"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const initialUsers = [
  { id: "u1", name: "Rafiul Islam", email: "rafiul@example.com", role: "user", lessons: 18 },
  { id: "u2", name: "Nusrat Jahan", email: "nusrat@example.com", role: "user", lessons: 15 },
  { id: "u3", name: "Tanvir Ahmed", email: "tanvir@example.com", role: "admin", lessons: 12 },
  { id: "u4", name: "Sadia Rahman", email: "sadia@example.com", role: "user", lessons: 9 },
];

const ManageUsersPage = () => {
  const [users, setUsers] = useState(initialUsers);

  const handleRoleToggle = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, role: u.role === "admin" ? "user" : "admin" } : u
      )
    );
    toast.success("User role updated");
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this user account?")) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success("User deleted");
  };

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
              <th>Lessons</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-base-300">
                <td className="font-medium">{u.name}</td>
                <td className="text-sm text-base-content/60">{u.email}</td>
                <td>
                  <span className={`badge ${u.role === "admin" ? "badge-secondary" : "badge-ghost"}`}>
                    {u.role}
                  </span>
                </td>
                <td>{u.lessons}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRoleToggle(u.id)}
                      className="btn btn-xs btn-outline btn-primary"
                    >
                      {u.role === "admin" ? "Demote" : "Make Admin"}
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="btn btn-xs btn-outline btn-error"
                    >
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