/** @format */

import { Container } from "react-bootstrap";

const Header = () => {
  return (
    <footer className='bg-light text-dark text-center py-3 mt-5'>
      <Container>
        <p className='mb-0'>
          © {new Date().getFullYear()} Developed by: Michael Angelo Rilan. All
          Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Header;
