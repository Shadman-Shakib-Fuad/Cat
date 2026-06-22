import Link from "next/link";
import { FaBookOpen } from "react-icons/fa";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-2">
      {}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary via-secondary to-accent text-white p-12">
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold">
          <FaBookOpen />
          <span>
            Digital<span className="opacity-90">Lessons</span>
          </span>
        </Link>

        <div>
          <h2 className="text-3xl font-extrabold mb-4 max-w-md">
            Your wisdom deserves a permanent home.
          </h2>
          <p className="opacity-90 max-w-sm">
            Join thousands of people who reflect, grow, and learn from each
            other's life lessons every day.
          </p>
        </div>

        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} Digital Life Lessons
        </p>
      </div>

      {}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">{title}</h1>
          <p className="text-base-content/60 mb-8">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;