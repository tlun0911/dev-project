import React from 'react';
import { useState, useEffect } from 'react';
import Meal from './Meal';

const MealList = ( {isHome = false} ) => {

    const [meals, setMeals] = useState([]);
    const [type, setType] = useState('all');

   
    let filter_items = <div></div>


    useEffect(() =>{
        const fetchMeals = async() =>{
            const apiURL = isHome ? '/api/meals?_limit=2' : '/api/meals';

            try{
                const res = await fetch(apiURL);
                const data = await res.json();
                setMeals(data);
            }catch(error){
                console.log("Error fetching data", error);
            }
        }
        fetchMeals();
    }, []);



    if (!isHome){
        filter_items = 
                <div className='container'>
                    <select className="form-select w-25 m-3 border-primary border-2" defaultValue='default'
                    aria-label="Default select example" id='filter-select'
                    onChange={(e) => setType(e.target.value)}>
                        <option value='default' disabled>Filter Type</option>
                        <option value="all">All</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                </div>
    }

  return (
    <>
        {filter_items}
        <div className="container text-center">
            <div className="row row-cols-1 row-cols-md-2 g-4">
                    {meals.map((meal) => (
                        (meal.type === type || type === 'all') ? (
                        <Meal key={meal.id} meal={meal} />

                        ) : null
                    ))}
                    
            </div>
        </div>
    </>
  )
}

export default MealList