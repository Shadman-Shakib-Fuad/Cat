"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaPlus, FaList, FaBookmark, FaUser, FaCrown } from "react-icons/fa";
import { MdAdminPanelSettings, MdPeople, MdReport } from "react-icons/md";
import PrivateRoute from "@/components/shared/PrivateRoute";

const userLinks = [
  { href: "/dashboard", label: "Overview", icon: <FaHome /> },
  { href: "/dashboard/add-lesson", label: "Add Lesson", icon: <FaPlus /> },
  { href: "/dashboard/my-lessons", label: "My Lessons", icon: <FaList /> },
  { href: "/dashboard/my-favorites", label: "My Favorites", icon: <FaBookmark /> },
  { href: "/dashboard/profile", label: "Profile", icon: <FaUser /> },
  { href: "/dashboard/pricing", label: "Upgrade", icon: <FaCrown /> },
];

const adminLinks = [
  { href: "/dashboard/admin", label: "Admin Home", icon: <MdAdminPanelSettings /> },
  { href: "/dashboard/admin/manage-users", label: "Manage Users", icon: <MdPeople /> },
  { href: "/dashboard/admin/manage-lessons", label: "Manage Lessons", icon: <FaList /> },
  { href: "/dashboard/admin/reported-lessons", label: "Reported Lessons", icon: <MdReport /> },
  { href: "/dashboard/admin/profile", label: "Admin Profile", icon: <FaUser /> },
];

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/dashboard/admin");
  const links = isAdminRoute ? adminLinks : userLinks;

  return (
    <PrivateRoute adminOnly={isAdminRoute}>
      <div className="min-h-screen flex flex-col lg:flex-row bg-base-200">
        <aside className="w-full lg:w-64 bg-base-100 border-r border-base-300 lg:min-h-screen">
          <div className="p-5 border-b border-base-300">
            <h2 className="font-extrabold text-lg text-primary">
              {isAdminRoute ? "Admin Panel" : "My Dashboard"}
            </h2>
          </div>
          <ul className="menu p-3 gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? "bg-primary text-primary-content font-semibold" : ""}
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </PrivateRoute>
  );
};

export default DashboardLayout;