import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPlan } from '../../features/plans/planSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectMealById, deleteMeal, getAllMeals } from '../../features/meals/mealSlice'
import Spinner from '../../components/Spinner'

const PlanPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mealPlans = useSelector((state) => state.plans.mealPlan);
    const { user, userStatus } = useSelector((state) => state.auth);
    const meals = useSelector((state) => state.meal.meals);
    const mealPlanStatus = useSelector((state) => state.plans.status);
    const mealStatus = useSelector((state) => state.meal.status);
    const error = useSelector((state) => state.plans.error || state.meal.error);

    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
        if (mealPlanStatus === 'idle') {
            dispatch(getPlan());
        }
        if (mealStatus === 'idle') {
            dispatch(getAllMeals());
        }
    }, [user, mealPlanStatus, mealStatus, dispatch, navigate]);
    
    if (mealPlanStatus === 'loading' || mealStatus === 'loading') {
        return <Spinner />;
    }

    if (mealPlanStatus === 'failed' && mealStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    const getMealDetails = (mealId) => meals.find((meal) => meal._id === mealId);

    const formatText = (text) =>{

        let firstLetter = text[0];
        let remaining = text.slice(1);
        let upperLetter = firstLetter.toUpperCase();        
        let formatted = upperLetter + remaining;
  
        return formatted;
    }


  return (
    <div className='container'>
    <h2 className='bg-primary'>Meal Plans</h2>
    {mealPlans.map(plan => (
        <div className="mb-3" key={plan._id}>
            <h3>Week starting: {new Date(plan.weekStartDate).toLocaleDateString()}</h3>
            <div className="accordion" id={plan._id}>
                <div className="accordion-item">
                {Object.entries(plan.days).map(([day, { meal }]) => {
                    const mealDetails = getMealDetails(meal);
                    console.log(day)
                    console.log(mealDetails)
                    return (
                        <div className="accordion-item" key={day}>
                        <h2 className="accordion-header">
                          <button className="accordion-button" type="button" 
                          data-bs-toggle="collapse" data-bs-target={`#collapse${plan._id}${day}`} 
                          aria-expanded="true" aria-controls={`collapse${plan._id}${day}`}
                          >
                            {formatText(day)} -  {mealDetails ? mealDetails.meal_name : 'No meal planned'}
                          </button>
                        </h2>
                        <div id={`collapse${plan._id}${day}`} className="accordion-collapse collapse" data-bs-parent={`#${plan._id}`}>
                          <div className="accordion-body">
                            {mealDetails ? (
                            <ol className='list-group list-group-numbered mb-3'>
                                {mealDetails.ingredients.map((ingredient, index) => (
                                <li key={index} className='list-group-item list-group-item-dark'>{formatText(ingredient)}</li>
                                ))}
                            </ol>
                            ) : ( <p>No ingredients available</p>
                        )}
                          </div>
                        </div>
                      </div>
                    );
                })}
                </div>
            </div>
        </div>
    ))}
</div>
);
};

export default PlanPage