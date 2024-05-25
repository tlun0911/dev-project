import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { createMeal }  from '../features/meals/mealSlice'
import './AddMealPage.css';

const AddMealPage = () => {

    const [mealData, setMealData] = useState({
        meal_name: '',
        type: '',
        ingredients: ['', '', ''],
        recipe: '',
    })

    const { meal_name, type, ingredients, recipe } = mealData

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { meals, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.meal
      )

    const addInputField = () => {
        setMealData({
            ...mealData,
            ingredients: [...mealData.ingredients, '']
            });
        };



    const submitForm = (e) =>{
        e.preventDefault()
        dispatch(createMeal(mealData))

    };

    const onChange = (e) => {
        setMealData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }

    const handleIngredientChange = (index, event) => {
        const newIngredients = mealData.ingredients.map((ingredient, i) => 
            i === index ? event.target.value : ingredient
          );
          setMealData({
            ...mealData,
            ingredients: newIngredients
          });
    }


  return (
    <>
        <section className="bg-primary py-5 mb-4">
            <div className="container mx-auto py-5 custom-max-width">
                <div className="bg-light px-4 py-4 mb-4 shadow rounded border m-4 m-md-0">
                    <form onSubmit={submitForm}>

                    <div className='mb-4'>
                        <label className="d-block text-dark fw-bold mb-2">
                            Meal Name
                        <input 
                            type='text'
                            id='meal_name'
                            name='meal_name'
                            className="form-control mb-2 border-primary"
                            required
                            value={meal_name}
                            onChange={onChange}
                        />
                        </label>
                    </div>
                    <div className='mb-4'>
                        <label className='d-block text-dark fw-bold px-3'>
                            Meal Type
                            <div className="form-check form-check m-1 border-primary">
                                <input className="form-check-input border-primary" type="radio"
                                id="breakfast-radio"
                                name="type"
                                value="breakfast"
                                onChange={onChange} />
                                <label className="form-check-label" htmlFor="breakfast-radio">
                                    Breakfast
                                </label>
                            </div>
                            <div className="form-check form-check m-1">
                                <input className="form-check-input border-primary" type="radio"
                                id="lunch-radio"
                                name="type"
                                value="lunch"
                                onChange={onChange} />
                                <label className="form-check-label" htmlFor="lunch-radio">
                                    Lunch
                                </label>
                            </div>
                            <div className="form-check form-check m-1">
                                <input className="form-check-input border-primary" type="radio"
                                id="dinner-radio"
                                name="type"
                                value="dinner"
                                onChange={onChange} />
                                <label className="form-check-label" htmlFor="dinner-radio">
                                    Dinner
                                </label>
                            </div>
                        </label>
                    </div>
                    <div className='mb-4'>
                        <label className="d-block text-dark fw-bold mb-2">
                            Ingredients
                        {mealData.ingredients.map((ingredient, index) => (
                            <div key={index}>
                                <div className="input-group mb-3">
                                    <span className="input-group-text border-primary">{`Ingredient ${index+1}`}</span>
                                    <input
                                        type='text'
                                        id={index}
                                        name='ingredient'
                                        className="form-control border-primary"
                                        required
                                        value={ingredient}
                                        onChange={(e) => handleIngredientChange(index, e)}
                                    />
                                </div>
                            </div>
                        ))}
                        </label>
                        
                        <button type="button" className="btn btn-primary" onClick={addInputField}>Add Additional Ingredient</button> 
                    </div>

                    <div className="mb-3">
                        <label htmlFor="recipe-input" className="form-label fw-bold">Recipe Input</label>
                        <textarea className="form-control border-primary"
                                    id="recipe-input" 
                                    name="recipe"
                                    rows="3"
                                    value={recipe}
                                    onChange={onChange}
                                    />
                    </div>

                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>

                    </form>
                </div>
            </div>
        </section>
    </>
  )
}

export default AddMealPage