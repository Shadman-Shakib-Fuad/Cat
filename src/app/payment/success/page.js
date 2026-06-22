import Link from "next/link";
import { FaCheckCircle, FaStar } from "react-icons/fa";

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <FaCheckCircle className="text-success mx-auto mb-6" size={72} />
        <h1 className="text-3xl font-extrabold mb-3">Payment Successful!</h1>
        <p className="text-base-content/70 mb-2">
          Welcome to the Premium community! Your account has been upgraded.
        </p>
        <div className="badge badge-warning gap-2 font-bold text-sm mb-8">
          <FaStar size={12} /> Premium Member — Lifetime Access
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/public-lessons" className="btn btn-primary">
            Browse Premium Lessons
          </Link>
          <Link href="/dashboard" className="btn btn-outline">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;