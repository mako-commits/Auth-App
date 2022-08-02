import { Link } from "react-router-dom";
import { useContext } from "react";
import classes from "./MainNavigation.module.css";
import AuthContext from "../../store/auth-context";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container className={classes.header} fluid>
        <Navbar.Brand>
          <Link to="/">
            <div className={classes.logo}>React Auth</div>
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className={`me-auto ${classes.resNav}`}>
            <Link to="/free">Free Access</Link>
            {!isLoggedIn && <Link to="/auth">Login</Link>}
            {isLoggedIn && <Link to="/profile">Profile</Link>}
            {isLoggedIn && <Link to="/changePassword">Change Password</Link>}
            {isLoggedIn && <Button onClick={logoutHandler}>Logout</Button>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
