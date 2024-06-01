import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlan, createPlan } from "../../features/plans/planSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { reset as planReset } from "../../features/plans/planSlice";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import {
  selectMealById,
  deleteMeal,
  getAllMeals,
} from "../../features/meals/mealSlice";
import Spinner from "../../components/Spinner";

const AddPlanPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newMeals, setNewMeals] = useState({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });
  const [weekEnding, setWeekEnding] = useState("");

  const { user, userStatus } = useSelector((state) => state.auth);
  const meals = useSelector((state) => state.meal.meals);
  const mealPlanStatus = useSelector((state) => state.plans.status);
  const mealStatus = useSelector((state) => state.meal.status);
  const error = useSelector((state) => state.plans.error || state.meal.error);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(planReset());
    }
    if (mealStatus === "idle") {
      dispatch(getAllMeals());
    }
  }, [user, mealPlanStatus, mealStatus, dispatch, navigate]);

  if (mealPlanStatus === "loading" || mealStatus === "loading") {
    return <Spinner />;
  }

  if (mealPlanStatus === "failed" && mealStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  const getMealDetails = (mealId) => meals.find((meal) => meal._id === mealId);

  const formatText = (text) => {
    let firstLetter = text[0];
    let remaining = text.slice(1);
    let upperLetter = firstLetter.toUpperCase();
    let formatted = upperLetter + remaining;

    return formatted;
  };

  const handleDayInput = (e, day) => {
    const value = e.target.value;
    setNewMeals((prevMeals) => ({
      ...prevMeals,
      [day]: value,
    }));
  };

  const submitPlan = (event) => {
    event.preventDefault();
    const newPlan = {
      weekStartDate: weekEnding,
      days: newMeals,
    };
    dispatch(createPlan(newPlan));
  };

  return (
    <div className="container">
      <h2 className="bg-primary">Create New Meal Plan</h2>
      <Form onSubmit={submitPlan}>
        <Form.Group className="mb-3" controlId="formStartDate">
          <Form.Label className="fw-bold">
            Enter the week start date:
          </Form.Label>
          <Form.Control
            className="w-25"
            type="date"
            value={weekEnding}
            onChange={(e) => setWeekEnding(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          {Object.entries(newMeals).map(([day]) => (
            <InputGroup className="mb-3" key={day}>
              <InputGroup.Text id="basic-addon3">
                {formatText(day)}
              </InputGroup.Text>
              <Form.Select
                className="w-50"
                aria-label="Default select example"
                onChange={(e) => handleDayInput(e, day)}
              >
                <option>Select Meal</option>
                {meals.map((meal) => (
                  <option key={meal._id} value={meal._id}>
                    {meal.meal_name}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          ))}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AddPlanPage;
