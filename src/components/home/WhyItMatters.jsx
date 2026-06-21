import { FaBrain, FaSeedling, FaUsers, FaHeart } from "react-icons/fa";

const benefits = [
  {
    icon: <FaBrain size={28} />,
    title: "Preserve Your Wisdom",
    desc: "Lessons learned through hard experiences fade with time. Writing them down keeps them alive forever.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: <FaSeedling size={28} />,
    title: "Mindful Reflection",
    desc: "The act of writing forces you to slow down and truly understand what an experience taught you.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: <FaUsers size={28} />,
    title: "Learn From Others",
    desc: "Why repeat someone else's mistake when their lesson is already written down for you?",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: <FaHeart size={28} />,
    title: "Grow With Community",
    desc: "Share your journey and be inspired by thousands of people growing alongside you.",
    color: "bg-primary/10 text-primary",
  },
];

const WhyItMatters = () => {
  return (
    <section className="section-container py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold mb-3">
          Why Learning From <span className="text-primary">Life</span> Matters
        </h2>
        <p className="text-base-content/70 max-w-xl mx-auto">
          Every experience holds a lesson. Here's why preserving them changes everything.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((item, idx) => (
          <div
            key={idx}
            className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${item.color}`}>
              {item.icon}
            </div>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-base-content/70">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyItMatters;