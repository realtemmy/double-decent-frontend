import { useEffect } from "react";
import CategoryPreview from "@/components/category-preview/CategoryPreview";
import Hero from "@/components/Hero/Hero";

const Home = () => {
  useEffect(() => {
    document.title = "Home"
  }, [])
  return <div>
    <Hero />
    <CategoryPreview />
  </div>;
};

export default Home;
