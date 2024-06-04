import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  selectMealById,
  deleteMeal,
  getAllMeals,
  addMealToUserCollection,
} from "../../features/meals/mealSlice";
import { useParams, useNavigate, Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

const MealPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const mealSelector = selectMealById(id);
  const meal = useSelector((state) => mealSelector(state));
  const status = useSelector((state) => state.meal.status);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch all meals when the component mounts
    if (status === "idle") {
      dispatch(getAllMeals(user._id));
    }
    window.scrollTo(0, 0);

  }, [dispatch, meal, status]);

  const recipeStyle = {
    whiteSpace: "pre-line",
  };

  const onDeleteClick = (user, mealId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this meal?"
    );

    if (!confirm) return;
    
    dispatch(deleteMeal({id: user._id, mealId: mealId}));
    toast.success("Meal deleted successfully!");
    navigate("/meals");
  };

  const formatText = (text) => {
    let firstLetter = text[0];
    let remaining = text.slice(1);
    let upperLetter = firstLetter.toUpperCase();
    let formatted = upperLetter + remaining;

    return formatted;
  };

  if (status === "loading") {
    return <Spinner />;
  }

  if (!meal) {
    return (
      <div className="container mx-auto py-3 px-3">
        <h2>Loading...</h2>
        <Link to="/meals" className="btn btn-primary">
          <FaArrowLeft className="mr-2" /> Back to Meals
        </Link>
      </div>
    );
  }

  let buttonArea;

  if (user._id === meal.user) {
    buttonArea = (
      <section className="d-flex justify-content-center p-3">
        <Link
          type="button"
          className="btn btn-primary m-2"
          to={`/edit-meal/${meal._id}`}
        >
          Edit Meal
        </Link>
        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={() => onDeleteClick(user, meal._id)}
        >
          Delete Meal
        </button>
      </section>
    );
  } else {
    buttonArea = (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={() => dispatch(addMealToUserCollection(meal._id))}
        >
          Add to My Meals
        </button>
      </div>
    );
  }

  return (
    <>
      <section>
        <div className="container mx-auto py-3 px-3">
          <Link to="/meals" type="button" className="btn btn-primary">
            <FaArrowLeft className="mr-2" /> Back to Meals
          </Link>
        </div>
      </section>
      <section className="bg-primary-50">
        <div className="container mx-auto py-2 px-4">
          <div className="card border-primary h-100">
            <h5 className="card-header bg-primary">{meal.meal_name}</h5>
            <div className="card-body">
              <h5 className="card-title mb-3">Ingredients</h5>
              <ol className="list-group list-group-numbered mb-3">
                {meal.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-dark"
                  >
                    {formatText(ingredient)}
                  </li>
                ))}
              </ol>

              <div className="card border-primary">
                <h5 className="card-header bg-primary">Recipe</h5>
                <div className="card-body">
                  <p className="card-text" style={recipeStyle}>
                    {meal.recipe}
                  </p>
                </div>
              </div>
            </div>
            {buttonArea}
          </div>
        </div>
      </section>
    </>
  );
};

export default MealPage;
