import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, getAllMeals } from "../features/meals/mealSlice";
import Meal from "./Meal";
import Spinner from "./Spinner";

const MealList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { meals, status, error, message } = useSelector((state) => state.meal);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getAllMeals(user._id));
    }
  }, [user, navigate, dispatch]);

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <div className="container">
      {meals.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 justify-content-center">
          {meals.map((meal) => (
            <Meal key={meal._id} meal={meal} user={user} />
          ))}
        </div>
      ) : (
        <h3>You don't have any meals, let's add some!</h3>
      )}
    </div>
  );
};

export default MealList;
