import { Helmet } from "react-helmet";
import CategoryPreview from "@/components/category-preview/CategoryPreview";
import Hero from "@/components/Hero/Hero";

const Home = () => {

  return (
    <div>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home page for Double decent superstores" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Hero />
      <CategoryPreview />
    </div>
  );
};

export default Home;
