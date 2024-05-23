import { Link } from 'react-router-dom';

const ViewAllMeals = () => {
  return (
    
        <section className='d-flex justify-content-center p-3'> 
            <Link to='/meals' type="button" className="btn btn-primary">
                View All Meals
            </Link>
        </section>
    
  )
}

export default ViewAllMeals