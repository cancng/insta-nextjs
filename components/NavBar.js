import Link from 'next/link';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FaInstagram } from 'react-icons/fa';

const NavBar = () => {
  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='dark'
      variant='dark'
      className='mb-3'
    >
      <Container>
        <Link href='/'>
          <a className='navbar-brand'>
            <FaInstagram /> Instagram
          </a>
        </Link>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse>
          <Nav>
            <Link href='/search'>
              <a className='nav-link'>Arama</a>
            </Link>
            <Link href='/deneme'>
              <a className='nav-link'>Hakkımızda</a>
            </Link>
            <NavDropdown title='News' id='collasible-nav-dropdown'>
              <NavDropdown.Item href='/'>Business</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/'>Technology</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
