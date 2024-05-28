import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const EditMealPage = () => {
    const [mealName, setMealName] = useState(meal.meal_name);
    const [ingredients, setIngredients] = useState(meal.ingredients);
    const [recipe, setRecipe] = useState(meal.recipe);

    const navigate = useNavigate();
    const { id } = useParams();

    const addInputField = () => {
        setIngredients([...ingredients, '']);
    };

    const handleIngredientChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = event.target.value;
        setIngredients(newIngredients);
    };

    const submitForm = (e) => {
        e.preventDefault();

        const updatedMeal = {
            id,
            "type": meal.type,
            "meal_name": mealName,
            ingredients,
            recipe,
        }

        updateMealSubmit(updatedMeal);

        return navigate(`/meals/${meal.id}`);


    }


  return (
    <>

    <section className="bg-primary py-5 mb-4">
            <div className="container mx-auto py-5 custom-max-width">
                <div className="bg-light px-4 py-4 mb-4 shadow rounded border m-4 m-md-0">
                    <form onSubmit={submitForm}>
                    <h2>Update Meal</h2>

                    <div className='mb-4'>
                        <label className="d-block text-dark fw-bold mb-2">
                            Meal Name
                        <input 
                            type='text'
                            id='meal_name'
                            name='meal_name'
                            className="form-control mb-2"
                            placeholder={mealName}
                            required
                            value={mealName}
                            onChange={(e) => setMealName(e.target.value)}
                        />
                        </label>
                    </div>
                    <div className='mb-4'>
                        <label className="d-block text-dark fw-bold mb-2">
                            Ingredients
                        {ingredients.map((ingredient, index) => (
                            <div key={index}>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">{`Ingredient ${index+1}`}</span>
                                    <input
                                        type='text'
                                        id={index}
                                        name='ingredient'
                                        className="form-control"
                                        placeholder={ingredient}
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
                        <textarea className="form-control"
                                    id="recipe-input" 
                                    rows="3"
                                    
                                    value={recipe}
                                    onChange={(e)=> setRecipe(e.target.value)}
                                    />
                    </div>

                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>

                    </form>
                </div>

            </div>


        </section>
    </>
  )
}

export default EditMealPage