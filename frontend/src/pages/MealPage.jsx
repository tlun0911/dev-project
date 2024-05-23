import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';

const MealPage = ({ deleteMeal }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const meal = useLoaderData();

    const onDeleteClick = (mealId) => {
      const confirm = window.confirm(
        'Are you sure you want to delete this meal?'
      );
  
      if (!confirm) return;
  
      deleteMeal(mealId);

      toast.success('Meal deleted successfully!');
  
      navigate('/meals');
    };

    const formatText = (text) =>{

      let firstLetter = text[0];
      let remaining = text.slice(1);
      let upperLetter = firstLetter.toUpperCase();        
      let formatted = upperLetter + remaining;

      return formatted;
  }

  return (
    <>
        <section>
          <div className="container mx-auto py-3 px-3">
              <Link 
                  to='/meals'
                  type='button'
                  className='btn btn-primary'
              >
                  <FaArrowLeft className='mr-2' /> Back to Meals
              </Link>
          </div>
        </section>
        <section className='bg-primary-50'>
          <div className='container mx-auto py-2 px-4'>
            <div className="card border-primary h-100">
              <h5 className="card-header bg-primary">{meal.meal_name}</h5>
              <div className="card-body">
              <h5 className="card-title">Ingredients</h5>
                <ol className='list-group list-group-numbered'>
                  {meal.ingredients.map((ingredient, index) => (
                    <li key={index} className='list-group-item list-group-item-dark'>{formatText(ingredient)}</li>
                    ))}
                </ol>
                <div className="card border-primary">
                  <h5 className="card-header bg-primary">Recipe</h5>
                  <div className="card-body">
                    <p className="card-text">{meal.recipe}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </section>
        <section className='d-flex justify-content-center p-3'> 
          <Link type="button"
            className="btn btn-primary m-2"
            to={`/edit-meal/${meal.id}`}>
            Edit Meal
          </Link>
          <button type="button"
            className="btn btn-primary m-2"
            onClick={() => onDeleteClick(meal.id)}>
            Delete Meal
          </button>
        </section>
    </>
  )
}

const mealLoader = async ({ params }) => {
    const res = await fetch(`/api/meals/${params.id}`);
    const data = await res.json();
    return data;
  };

export { MealPage as default, mealLoader };