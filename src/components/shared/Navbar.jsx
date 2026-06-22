"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBookOpen, FaBars } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { useAuth } from "@/lib/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isPremium, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const navLinks = (
    <>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/public-lessons">Public Lessons</Link></li>
      {user && (
        <>
          <li><Link href="/dashboard/add-lesson">Add Lesson</Link></li>
          <li><Link href="/dashboard/my-lessons">My Lessons</Link></li>
        </>
      )}
      {user && !isPremium && (
        <li><Link href="/dashboard/pricing">Pricing / Upgrade</Link></li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 sm:px-6 lg:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost lg:hidden">
            <FaBars size={20} />
          </button>
          {isOpen && (
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56">
              {navLinks}
            </ul>
          )}
        </div>
        <Link href="/" className="btn btn-ghost text-xl font-extrabold gap-1">
          <FaBookOpen className="text-primary" />
          <span>Digital<span className="text-primary">Lessons</span></span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1 font-medium">{navLinks}</ul>
      </div>

      <div className="navbar-end gap-2">
        {!user ? (
          <>
            <Link href="/login" className="btn btn-ghost">Login</Link>
            <Link href="/register" className="btn btn-primary">Sign Up</Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL || "https://i.pravatar.cc/150?img=12"} alt="avatar" />
              </div>
            </button>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="px-3 py-1 font-semibold flex items-center gap-2">
                {user?.name}
                {isPremium && <FaStar className="text-warning" size={12} />}
              </li>
              <li><Link href="/dashboard/profile">Profile</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;