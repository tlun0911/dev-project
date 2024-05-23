import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import './NotFoundPage.css'


const NotFoundPage = () => {
  return (
    <section className='text-center d-flex flex-column justify-content-center align-items-center'>
        <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4"/>
        <h1 className='font-weight-bold mb-4'>404 Not Found</h1>
        <p className='fs-4 mb-3'>This page does not exist</p>
        <Link type="button" className="btn btn-primary"to="/">Go Back</Link>
    </section>
  )
}

export default NotFoundPage