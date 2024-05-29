import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPlan } from '../features/plans/planSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectMealById, deleteMeal, getAllMeals } from '../features/meals/mealSlice'

const PlanPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getPlan())
  
      }, [])


    const { user } = useSelector((state) => state.auth)

    const { mealPlan, status, idle } = useSelector(
        (state) => state.plans
      );

    console.log(mealPlan)
    let currentMeal = mealPlan[0]
    console.log(currentMeal)
    
   // const mealSelector = selectMealById(mealPlan.days.monday.meal);
    //const currentMeal = useSelector((state) => mealSelector(state));




  return (
    <div>PlanPage</div>
  )
}

export default PlanPage