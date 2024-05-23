import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavItem } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './NavBar.css'


const NavBar = () => {

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
                <Nav className="mr-auto">
                  <Nav.Link as={NavLink} to="/login" className='nav-link' activeclassname='active'>Login</Nav.Link>
                  <Nav.Link as={NavLink} to="/register" className='nav-link' activeclassname='active'>Register</Nav.Link>
                </Nav>   
        </Container>
    </Navbar>

  )
}

export default NavBar