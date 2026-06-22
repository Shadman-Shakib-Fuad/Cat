import Link from "next/link";
import { FaTimesCircle } from "react-icons/fa";

const PaymentCancelPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <FaTimesCircle className="text-error mx-auto mb-6" size={72} />
        <h1 className="text-3xl font-extrabold mb-3">Payment Cancelled</h1>
        <p className="text-base-content/70 mb-8">
          Your payment was not completed. No charges were made to your account.
          You can try again anytime.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard/pricing" className="btn btn-primary">
            Try Again
          </Link>
          <Link href="/" className="btn btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;