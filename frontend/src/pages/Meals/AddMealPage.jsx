import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createMeal } from "../../features/meals/mealSlice";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { FaPlus } from "react-icons/fa6";
import { reset } from "../../features/auth/authSlice";
import "./AddMealPage.css";

const AddMealPage = () => {
  const { user, userStatus } = useSelector((state) => state.auth);

  const [mealData, setMealData] = useState({
    meal_name: "",
    type: "",
    ingredients: ["", "", ""],
    recipe: "",
    user_email: user ? user.email : "",
  });

  const { meal_name, type, ingredients, recipe } = mealData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { meals, status, message } = useSelector((state) => state.meal);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate, userStatus, message, dispatch]);

  const addInputField = () => {
    setMealData({
      ...mealData,
      ingredients: [...mealData.ingredients, ""],
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(createMeal(mealData));
    toast.success("Meal submitted successfully");
    let clearMealData = {
      meal_name: "",
      type: "",
      ingredients: ["", "", ""],
      recipe: "",
    };
    setMealData(clearMealData);
    navigate("/add-meal");
  };

  const onChange = (e) => {
    setMealData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleIngredientChange = (index, event) => {
    const newIngredients = mealData.ingredients.map((ingredient, i) =>
      i === index ? event.target.value : ingredient
    );
    setMealData({
      ...mealData,
      ingredients: newIngredients,
    });
  };

  return (
    <Form
      onSubmit={submitForm}
      className="container mx-auto mt-3 bg-light shadow rounded border"
    >
      <Form.Group className="mb-3 border-primary">
        <Form.Label className="h4 my-2">Meal Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter meal name"
          className="border-primary"
          name="meal_name"
          value={meal_name}
          required
          onChange={onChange}
        />
      </Form.Group>

      <Form.Select
        aria-label="Default select example"
        id="type"
        className="border-primary mb-3"
        required
        name="type"
        onChange={onChange}
      >
        <option>Select Meal Type</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </Form.Select>

      {mealData.ingredients.map((ingredient, index) => (
        <InputGroup className="mb-3" key={index}>
          <InputGroup.Text id="inputGroup-sizing-default">
            {`Ingredient ${index + 1}`}
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            className="border-primary"
            type="text"
            required
            id={index}
            name="ingredient"
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e)}
          />
        </InputGroup>
      ))}

      <Button
        variant="outline-primary"
        className="mb-3"
        onClick={addInputField}
      >
        <FaPlus />
      </Button>

      <InputGroup className="border-primary mb-3">
        <InputGroup.Text>Enter Recipe:</InputGroup.Text>
        <Form.Control
          as="textarea"
          required
          id="recipe"
          value={recipe}
          rows="4"
          name="recipe"
          onChange={onChange}
          aria-label="With textarea"
        />
      </InputGroup>
      <Container className="d-flex justify-content-center mb-3">
        <Button variant="primary" className="" type="submit" value="submit">
          Submit
        </Button>
      </Container>
    </Form>
  );
};

export default AddMealPage;
