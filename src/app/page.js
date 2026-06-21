import HeroSlider from "@/components/home/HeroSlider";
import WhyItMatters from "@/components/home/WhyItMatters";
import FeaturedLessons from "@/components/home/FeaturedLessons";
import TopContributors from "@/components/home/TopContributors";
import MostSavedLessons from "@/components/home/MostSavedLessons";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <WhyItMatters />
      <FeaturedLessons />
      <TopContributors />
      <MostSavedLessons />
    </div>
  );
};

export default Home;