export const CATEGORIES = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];

export const EMOTIONAL_TONES = ["Motivational", "Sad", "Realization", "Gratitude"];

export const sampleLessons = [
  {
    id: "1",
    title: "Failure is Just Feedback",
    description:
      "I used to fear failing at work, until I realized every mistake was just data telling me what to fix next.",
    fullDescription:
      "For years, I treated every failed project as proof that I wasn't good enough. It wasn't until a mentor told me 'failure is just feedback' that something shifted. I started writing down exactly what went wrong after every setback instead of spiraling into self-criticism. Slowly, those notes became my best teacher. The same mistakes stopped repeating, and I started taking bigger risks because I no longer feared the outcome — I welcomed the lesson hiding inside it.",
    category: "Career",
    emotionalTone: "Realization",
    accessLevel: "Free",
    visibility: "Public",
    isFeatured: true,
    image: "https://picsum.photos/seed/lesson1/800/450",
    creator: { id: "u1", name: "Rafiul Islam", photo: "https://i.pravatar.cc/150?img=12", lessonsCount: 18 },
    createdAt: "2025-05-12",
    lastUpdated: "2025-05-20",
    likesCount: 1240,
    favoritesCount: 342,
    viewsCount: Math.floor(Math.random() * 10000),
  },
  {
    id: "2",
    title: "Letting Go of People Who Drain You",
    description:
      "Not every relationship deserves your energy. Walking away can be the most loving thing you do for yourself.",
    fullDescription:
      "I spent years holding onto friendships out of guilt, not love. I kept showing up for people who never showed up for me, thinking that was loyalty. Letting go felt like failure at first. But the space it created let healthier relationships grow. Now I measure connections by how I feel after them, not how long I've known the person.",
    category: "Relationships",
    emotionalTone: "Gratitude",
    accessLevel: "Premium",
    visibility: "Public",
    isFeatured: true,
    image: "https://picsum.photos/seed/lesson2/800/450",
    creator: { id: "u2", name: "Nusrat Jahan", photo: "https://i.pravatar.cc/150?img=32", lessonsCount: 15 },
    createdAt: "2025-06-02",
    lastUpdated: "2025-06-02",
    likesCount: 980,
    favoritesCount: 521,
    viewsCount: Math.floor(Math.random() * 10000),
  },
  {
    id: "3",
    title: "Small Habits Build Big Lives",
    description:
      "I didn't change overnight. I changed one tiny 10-minute habit at a time, repeated for 2 years.",
    fullDescription:
      "Everyone wants the dramatic transformation story, but mine was boring. One 10-minute walk. One page read before bed. One glass of water before coffee. None of it felt significant on its own. But two years later, those tiny repeated actions had quietly rebuilt my entire life — my health, my focus, my confidence. Big change is just small change, repeated long enough.",
    category: "Personal Growth",
    emotionalTone: "Motivational",
    accessLevel: "Free",
    visibility: "Public",
    isFeatured: true,
    image: "https://picsum.photos/seed/lesson3/800/450",
    creator: { id: "u3", name: "Tanvir Ahmed", photo: "https://i.pravatar.cc/150?img=51", lessonsCount: 12 },
    createdAt: "2025-04-21",
    lastUpdated: "2025-04-25",
    likesCount: 2103,
    favoritesCount: 689,
    viewsCount: Math.floor(Math.random() * 10000),
  },
  {
    id: "4",
    title: "Grief Taught Me to Live Slower",
    description:
      "After losing my father, I stopped rushing through life. Every ordinary Tuesday became something to cherish.",
    fullDescription:
      "Before he passed, I was always rushing to the next milestone — promotion, vacation, weekend. Grief stopped me completely. In the stillness that followed, I noticed things I'd ignored for years: my mother's laugh, the smell of rain, a slow Sunday breakfast. I wouldn't wish grief on anyone, but I'm grateful for the slowness it taught me.",
    category: "Mindset",
    emotionalTone: "Sad",
    accessLevel: "Free",
    visibility: "Public",
    isFeatured: false,
    image: "https://picsum.photos/seed/lesson4/800/450",
    creator: { id: "u4", name: "Sadia Rahman", photo: "https://i.pravatar.cc/150?img=44", lessonsCount: 9 },
    createdAt: "2025-03-10",
    lastUpdated: "2025-03-10",
    likesCount: 754,
    favoritesCount: 410,
    viewsCount: Math.floor(Math.random() * 10000),
  },
  {
    id: "5",
    title: "The Job I Didn't Get Saved My Career",
    description:
      "Rejection redirected me toward a path I never planned, and it turned out to be exactly where I belonged.",
    fullDescription:
      "I was devastated when I didn't get that 'dream job' five years ago. I sulked for weeks. Then, almost by accident, I took a role I considered a backup plan — and it opened doors I never knew existed. Looking back, that rejection wasn't a wall. It was a redirect I didn't ask for but desperately needed.",
    category: "Mistakes Learned",
    emotionalTone: "Realization",
    accessLevel: "Premium",
    visibility: "Public",
    isFeatured: false,
    image: "https://picsum.photos/seed/lesson5/800/450",
    creator: { id: "u1", name: "Rafiul Islam", photo: "https://i.pravatar.cc/150?img=12", lessonsCount: 18 },
    createdAt: "2025-06-15",
    lastUpdated: "2025-06-15",
    likesCount: 612,
    favoritesCount: 590,
    viewsCount: Math.floor(Math.random() * 10000),
  },
  {
    id: "6",
    title: "Boundaries Are Not Selfish",
    description:
      "Saying no used to feel like betrayal. Now I know it's the only way I show up fully for the people I love.",
    fullDescription:
      "I used to say yes to everything out of fear of disappointing people. It left me exhausted and quietly resentful. Learning to say no — kindly but firmly — felt selfish at first. But boundaries didn't push people away; they made my relationships healthier, because what I gave, I gave fully and willingly.",
    category: "Relationships",
    emotionalTone: "Motivational",
    accessLevel: "Free",
    visibility: "Public",
    isFeatured: false,
    image: "https://picsum.photos/seed/lesson6/800/450",
    creator: { id: "u2", name: "Nusrat Jahan", photo: "https://i.pravatar.cc/150?img=32", lessonsCount: 15 },
    createdAt: "2025-05-29",
    lastUpdated: "2025-06-01",
    likesCount: 1340,
    favoritesCount: 455,
    viewsCount: Math.floor(Math.random() * 10000),
  },
];

export const topContributors = [
  { id: "u1", name: "Rafiul Islam", photo: "https://i.pravatar.cc/150?img=12", lessonsCount: 18 },
  { id: "u2", name: "Nusrat Jahan", photo: "https://i.pravatar.cc/150?img=32", lessonsCount: 15 },
  { id: "u3", name: "Tanvir Ahmed", photo: "https://i.pravatar.cc/150?img=51", lessonsCount: 12 },
  { id: "u4", name: "Sadia Rahman", photo: "https://i.pravatar.cc/150?img=44", lessonsCount: 9 },
];

export const sampleComments = {
  1: [
    { id: "c1", user: "Mahin Khan", photo: "https://i.pravatar.cc/150?img=15", text: "This hit different. I needed to read this today.", createdAt: "2025-06-10" },
    { id: "c2", user: "Farzana Akter", photo: "https://i.pravatar.cc/150?img=25", text: "Saving this for the next time I screw up at work 😅", createdAt: "2025-06-12" },
  ],
  3: [
    { id: "c3", user: "Imran Hossain", photo: "https://i.pravatar.cc/150?img=8", text: "Two years of small habits... that's real consistency. Inspiring.", createdAt: "2025-04-22" },
  ],
};

export const getLessonById = (id) => sampleLessons.find((lesson) => lesson.id === id);

export const getEstimatedReadingTime = (text = "") => {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};