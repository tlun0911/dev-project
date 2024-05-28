import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from'react-redux'
import { useNavigate } from 'react-router-dom';
import { reset, getAllMeals } from '../features/meals/mealSlice'
import Meal from './Meal';

const MealList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { meals, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.meal
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getAllMeals())
    dispatch(reset())


  }, [user, navigate, isError, message, dispatch])
    

  return (
      <div className='container'>
          {meals.length > 0 ? (
            <div className='row row-cols-2'>
              {meals.map((meal) => (
                <Meal key={meal._id} meal={meal} />
              ))}
            </div>
          ) : (
            <h3>You don't have any meals, let's add some!</h3>
          )}
        </div>

      
  )
}

export default MealList