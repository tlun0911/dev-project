import React from 'react'
import { Link } from 'react-router-dom';


const Meal = ({meal, user}) => {

    const formatText = (text) =>{

        let firstLetter = text[0];
        let remaining = text.slice(1);
        let upperLetter = firstLetter.toUpperCase();        
        let formatted = upperLetter + remaining;

        return formatted;
    }

  return (
    <div className='row row-cols-2'>
    <div className="col-sm mb-3">
        <div className="card border-primary border-2 h-100 mb-3">
        <div className="d-flex justify-content-between align-items-center bg-primary">
            <h4 className="card-header bg-primary">{meal.meal_name}</h4>
            <h5 className='mx-3'>Favorite Placeholder</h5>       
        </div>
            <div className="card-body">
            <h5 className="card-subtitle mb-3 text-body-secondary">Category - {formatText(meal.type)}</h5>
            <h6 className="card-title mb-3">Ingredients</h6>
            
                <ol className='list-group list-group-numbered'>
                    {meal.ingredients.map((ingredient, index) => (
                        <li key={index} className='list-group-item bg-secondary'>{formatText(ingredient)}</li>
                    ))}
                </ol>
                <p className="card-text">Created by - {meal.user_email}</p>
                <Link to={`/meals/${meal._id}`}
                    className='bg-primary text-white px-4 py-2 rounded text-center small'>
                    Meal Details
                </Link>
            </div>
        </div>
    </div>
    </div>

  )
}

export default Meal