import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AddMealPage.css';

const AddMealPage = ({ addMealSubmit }) => {
    const [mealName, setMealName] = useState('');
    const [ingredients, setIngredients] = useState(['', '', '']);
    const [recipe, setRecipe] = useState([]);
    const [type, setType] = useState('');

    const navigate = useNavigate();

    const addInputField = () => {
        setIngredients([...ingredients, '']);
    };

    const handleIngredientChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = event.target.value;
        setIngredients(newIngredients);
    };

    const submitForm = (e) =>{
        e.preventDefault();

        const newMeal = {
            "meal_name": mealName,
            "type": type,
            "ingredients": ingredients,
            "recipe": recipe,
        }

        addMealSubmit(newMeal);

        toast.success('Meal added successfully!');

        return navigate('/');

    };


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
                            value={mealName}
                            onChange={(e) => setMealName(e.target.value)}
                        />
                        </label>
                    </div>
                    <div className='mb-4'>
                        <label className='d-block text-dark fw-bold px-3'>
                            Meal Type
                            <div className="form-check form-check m-1 border-primary">
                                <input className="form-check-input border-primary" type="radio"
                                id="breakfast-radio"
                                name="type-radios"
                                value="breakfast"
                                onChange={(e) => setType(e.target.value)} />
                                <label className="form-check-label" htmlFor="breakfast-radio">
                                    Breakfast
                                </label>
                            </div>
                            <div className="form-check form-check m-1">
                                <input className="form-check-input border-primary" type="radio"
                                id="lunch-radio"
                                name="type-radios"
                                value="lunch"
                                onChange={(e) => setType(e.target.value)} />
                                <label className="form-check-label" htmlFor="lunch-radio">
                                    Lunch
                                </label>
                            </div>
                            <div className="form-check form-check m-1">
                                <input className="form-check-input border-primary" type="radio"
                                id="dinner-radio"
                                name="type-radios"
                                value="dinner"
                                onChange={(e) => setType(e.target.value)} />
                                <label className="form-check-label" htmlFor="dinner-radio">
                                    Dinner
                                </label>
                            </div>
                        </label>
                    </div>
                    <div className='mb-4'>
                        <label className="d-block text-dark fw-bold mb-2">
                            Ingredients
                        {ingredients.map((ingredient, index) => (
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
                                    rows="3"
                                    value={recipe}
                                    onChange={(e)=> setRecipe(e.target.value)}
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