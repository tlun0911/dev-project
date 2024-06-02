import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Meal = ({ meal }) => {

  const [seeAllIngredients, setSeeAllIngredients] = useState(false);

  const formatText = (text) => {
    let firstLetter = text[0];
    let remaining = text.slice(1);
    let upperLetter = firstLetter.toUpperCase();
    let formatted = upperLetter + remaining;

    return formatted;
  };

  let ingredientsList

  if(seeAllIngredients) {
    ingredientsList = (
    meal.ingredients.map((ingredient, index) => (
      <li key={index} className="list-group-item bg-secondary">
        {formatText(ingredient)}
      </li>
    ))
    )      
  } else {
    ingredientsList = (
      meal.ingredients.slice(0, 3).map((ingredient, index) => (
        <li key={index} className="list-group-item bg-secondary">
          {formatText(ingredient)}
        </li>
      ))
    )
  }

  return (
    <div className="row row-cols-2">
      <div className="col-sm mb-3">
        <div className="card border-primary border-2 h-100 mb-3">
          <div className="d-flex justify-content-between align-items-center bg-primary">
            <h4 className="card-header bg-primary">{meal.meal_name}</h4>
            <h5 className="mx-3">Favorite Placeholder</h5>
          </div>
          <div className="card-body">
            <h5 className="card-subtitle mb-3 text-body-secondary">
              Category - {formatText(meal.type)}
            </h5>
            <h6 className="card-title mb-3">Ingredients</h6>

            <ol className="list-group list-group-numbered">
              {ingredientsList}            
            </ol>
            <p className="card-text">Created by - {meal.user_email}
              <span className="float-end">
              <button
                onClick={() => setSeeAllIngredients((prevState) => !prevState)}
                className='btn btn-primary mb-1 me-2'
              >
                {seeAllIngredients ? 'Less' : 'More'}
              </button>

              </span>
            </p>
            <Link
              to={`/meals/${meal._id}`}
              className="bg-primary text-white px-4 py-2 rounded text-center small"
            >
              Meal Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meal;
