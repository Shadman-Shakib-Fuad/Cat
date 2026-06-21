"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    title: "Your Wisdom Deserves to Be Remembered",
    subtitle:
      "Capture the life lessons you've earned the hard way, before time makes you forget them.",
    bg: "from-primary to-secondary",
  },
  {
    id: 2,
    title: "Learn From Thousands of Real Stories",
    subtitle:
      "Browse public lessons shared by people who turned their struggles into wisdom.",
    bg: "from-secondary to-accent",
  },
  {
    id: 3,
    title: "Reflect. Grow. Repeat.",
    subtitle:
      "Track your personal growth journey and revisit the lessons that shaped who you are.",
    bg: "from-accent to-primary",
  },
];

const HeroSlider = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      loop
      className="w-full"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className={`bg-gradient-to-br ${slide.bg} text-white min-h-[420px] md:min-h-[480px] flex items-center`}
          >
            <div className="section-container text-center py-16">
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4 max-w-3xl mx-auto">
                {slide.title}
              </h1>
              <p className="text-base md:text-lg opacity-90 max-w-xl mx-auto mb-8">
                {slide.subtitle}
              </p>
              <Link href="/public-lessons" className="btn btn-lg bg-white text-primary border-none hover:bg-white/90">
                Explore Lessons
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;