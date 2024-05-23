import React from 'react'
import { Link } from 'react-router-dom';

const Meal = ({ meal }) => {

    const formatText = (text) =>{

        let firstLetter = text[0];
        let remaining = text.slice(1);
        let upperLetter = firstLetter.toUpperCase();        
        let formatted = upperLetter + remaining;

        return formatted;
    }

  return (
    <>
    <div className="col">
        <div className="card border-primary border-2 h-100">
        <h5 className="card-header bg-primary">{meal.meal_name}</h5>
            <div className="card-body">
            <h5 className="card-title">Ingredients</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">{formatText(meal.type)}</h6>
                <ol className='list-group list-group-numbered'>
                    {meal.ingredients.map((ingredient, index) => (
                        <li key={index} className='list-group-item list-group-item-dark'>{formatText(ingredient)}</li>
                    ))}
                </ol>
                <p className="card-text">Click below to see the full details and recipe!</p>
                <Link to={`/meals/${meal.id}`}
                    className='bg-primary text-white px-4 py-2 rounded text-center small'>
                    Meal Details
                </Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default Meal