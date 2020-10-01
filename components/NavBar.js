import Link from 'next/link';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

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
          <a className='navbar-brand'>Instagram</a>
        </Link>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse>
          <Nav>
            <Link href='/deneme'>
              <a className='nav-link'>Deneme</a>
            </Link>
            <NavDropdown title='News' id='collasible-nav-dropdown'>
              <NavDropdown.Item href='/business'>Business</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/technology'>Technology</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='News' id='collasible-nav-dropdown'>
              <NavDropdown.Item href='/business'>Business</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/technology'>Technology</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='News' id='collasible-nav-dropdown'>
              <NavDropdown.Item href='/business'>Business</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/technology'>Technology</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='News' id='collasible-nav-dropdown'>
              <NavDropdown.Item href='/business'>Business</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/technology'>Technology</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='News' id='collasible-nav-dropdown'>
              <NavDropdown.Item href='/business'>Business</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/technology'>Technology</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
