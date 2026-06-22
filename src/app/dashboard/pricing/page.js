import Link from "next/link";
import { FaCheck, FaTimes, FaStar } from "react-icons/fa";

const features = [
  { label: "Create life lessons", free: "Up to 5", premium: "Unlimited" },
  { label: "Create Premium lessons", free: false, premium: true },
  { label: "View Premium lessons", free: false, premium: true },
  { label: "Ad-free experience", free: false, premium: true },
  { label: "Priority listing in public feed", free: false, premium: true },
  { label: "Community Premium badge", free: false, premium: true },
  { label: "Save to favorites", free: "Up to 10", premium: "Unlimited" },
  { label: "Access to all public Free lessons", free: true, premium: true },
];

const Cell = ({ value }) => {
  if (value === true)
    return <FaCheck className="text-success mx-auto" size={18} />;
  if (value === false)
    return <FaTimes className="text-error mx-auto" size={18} />;
  return <span className="font-medium text-sm">{value}</span>;
};

const PricingPage = () => {
  return (
    <div className="section-container py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold mb-3">
          Simple, <span className="text-primary">Honest</span> Pricing
        </h1>
        <p className="text-base-content/70 max-w-xl mx-auto">
          One plan. One payment. Lifetime access to everything.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        <div className="card bg-base-100 border border-base-300 shadow-md p-8">
          <h2 className="text-xl font-bold mb-2">Free</h2>
          <p className="text-4xl font-extrabold mb-1">৳0</p>
          <p className="text-base-content/60 text-sm mb-6">Forever free</p>
          <ul className="space-y-3 text-sm text-base-content/80">
            <li className="flex items-center gap-2"><FaCheck className="text-success" /> Create up to 5 lessons</li>
            <li className="flex items-center gap-2"><FaCheck className="text-success" /> Browse all public Free lessons</li>
            <li className="flex items-center gap-2"><FaCheck className="text-success" /> Save up to 10 favorites</li>
            <li className="flex items-center gap-2"><FaTimes className="text-error" /> No Premium lesson access</li>
            <li className="flex items-center gap-2"><FaTimes className="text-error" /> No Premium badge</li>
          </ul>
          <div className="mt-8">
            <span className="btn btn-outline w-full pointer-events-none">Current Plan</span>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-primary to-secondary text-white shadow-xl p-8 relative overflow-hidden">
          <div className="badge bg-warning text-warning-content absolute top-4 right-4 gap-1 font-bold">
            <FaStar size={10} /> Best Value
          </div>
          <h2 className="text-xl font-bold mb-2">Premium</h2>
          <p className="text-4xl font-extrabold mb-1">৳1500</p>
          <p className="opacity-80 text-sm mb-6">One-time · Lifetime access</p>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex items-center gap-2"><FaCheck /> Everything in Free</li>
            <li className="flex items-center gap-2"><FaCheck /> Unlimited lesson creation</li>
            <li className="flex items-center gap-2"><FaCheck /> Create & view Premium lessons</li>
            <li className="flex items-center gap-2"><FaCheck /> Ad-free experience</li>
            <li className="flex items-center gap-2"><FaCheck /> Priority listing in public feed</li>
            <li className="flex items-center gap-2"><FaCheck /> Community Premium ⭐ badge</li>
          </ul>
          <div className="mt-8">
            <Link href="/payment/checkout" className="btn bg-white text-primary hover:bg-white/90 border-none w-full font-bold">
              Upgrade to Premium
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-6">Full Comparison</h2>
        <div className="overflow-x-auto rounded-2xl border border-base-300">
          <table className="table text-center">
            <thead className="bg-base-200">
              <tr>
                <th className="text-left">Feature</th>
                <th>Free</th>
                <th className="text-primary">Premium</th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, idx) => (
                <tr key={idx} className="border-t border-base-300">
                  <td className="text-left text-sm">{row.label}</td>
                  <td><Cell value={row.free} /></td>
                  <td><Cell value={row.premium} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;