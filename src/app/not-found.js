import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-base-100">
      <div className="text-[120px] font-extrabold leading-none bg-gradient-to-br from-primary via-secondary to-accent bg-clip-text text-transparent select-none">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold mt-4 mb-3">
        Oops! Page Not Found
      </h1>
      <p className="text-base-content/60 max-w-md mb-8">
        The page you are looking for might have been removed, renamed, or just never existed.
      </p>
      <Link href="/" className="btn btn-primary btn-lg">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;