import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, browseMeals } from "../features/meals/mealSlice";
import Spinner from "./Spinner";
import Meal from "./Meal";

const BrowseMeals = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, userStatus } = useSelector((state) => state.auth);
  const { meals, status, error, message } = useSelector((state) => state.meal);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(browseMeals(user._id));
    }

  }, [user, navigate, dispatch]);

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <div className="container">
      {meals.length > 0 ? (
        <div className="row row-cols-2">
          {meals.map((meal) => (
            <Meal key={meal._id} meal={meal} />
          ))}
        </div>
      ) : (
        <h3>You don't have any meals, let's add some!</h3>
      )}
    </div>
  );
};

export default BrowseMeals;
