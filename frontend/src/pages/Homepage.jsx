import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
