import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, getAllMeals } from '../features/meals/mealSlice';
import Meal from './Meal';

const MealList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { meals, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.meal
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getAllMeals());
    }


  }, [user, navigate, dispatch, isSuccess, isError]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [isError, message]);

  return (
    <div className='container'>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : meals.length > 0 ? (
        <div className='row row-cols-2'>
          {meals.map((meal) => (
            <Meal key={meal._id} meal={meal} user={user} />
          ))}
        </div>
      ) : (
        <h3>You don't have any meals, let's add some!</h3>
      )}
    </div>
  );
};

export default MealList;
