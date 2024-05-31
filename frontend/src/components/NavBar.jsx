import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavItem } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './NavBar.css'
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice'
import { reset as mealReset} from '../features/meals/mealSlice'
import { reset as planReset } from '../features/plans/planSlice';


const NavBar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    dispatch(mealReset())
    dispatch(planReset())
    navigate('/')
  }

  const activeLink = ({isActive}) =>
    isActive
            ? 'fw-bold text-decoration-underline'
            : '';
    
  return (
    <Navbar sticky='top' expand="lg" className="bg-body-tertiary" id="main-navbar">
        <Navbar.Brand href="/">Meal Planner</Navbar.Brand>
        <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={NavLink} to="/" className='nav-link' activeclassname='active'>Home</Nav.Link>
                    <NavDropdown title="Meals" id="basic-nav-dropdown">
                      <NavDropdown.Item as={NavLink} to="/meals" className='nav-link' activeclassname='active'>Meals</NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/add-meal" className='nav-link' activeclassname='active'>Add Meal</NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/browse" className='nav-link' activeclassname='active'>Browse Other User Meals</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Meal Plan" id="basic-nav-dropdown">
                      <NavDropdown.Item as={NavLink} to="/plans" className='nav-link' activeclassname='active'>Weekly Plan</NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/plans/create" className='nav-link' activeclassname='active'>Create New Plan</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
             
              {user ? (
                <div>
                  <span className='fw-400 mx-3'>{user.email}</span>                  
                  <button type="button" className='btn btn-primary mx-3' onClick={onLogout}>
                    Sign Out
                  </button>
                </div>                
                
              ) : (
                <div>
                  <Nav className="mx-3">
                    <Nav.Link as={NavLink} to="/login" className='nav-link' activeclassname='active'>Login</Nav.Link>
                    <Nav.Link as={NavLink} to="/register" className='nav-link' activeclassname='active'>Register</Nav.Link> 
                  </Nav>
                </div>
            )}
            
 
        </Container>
    </Navbar>

  )
}

export default NavBar