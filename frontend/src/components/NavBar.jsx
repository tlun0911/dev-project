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


const NavBar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
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
                    <Nav.Link as={NavLink} to="/meals" className='nav-link' activeclassname='active'>Meals</Nav.Link>
                    <Nav.Link as={NavLink} to="/add-meal" className='nav-link' activeclassname='active'>Add Meal</Nav.Link>
                </Nav>
            </Navbar.Collapse>
             
              {user ? (
                  <li>
                  <button type="button" className='btn btn-primary' onClick={onLogout}>
                    Sign Out
                  </button>
                  </li>
                
              ) : (
                <div>
                  <Nav className="mr-auto">
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