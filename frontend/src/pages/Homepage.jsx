import Hero from "../components/Hero";
import MealList from "../components/MealList";
import ViewAllMeals from "../components/ViewAllMeals";

const Homepage = () => {
  return (
    <>
      <Hero />
      <MealList isHome={true} />
      <ViewAllMeals />
    </>
  );
};

export default Homepage;
