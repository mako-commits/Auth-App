import React from "react";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import Button from "react-bootstrap/Button";

const Logout = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <Button variant="dark" onClick={logoutHandler}>
      Logout
    </Button>
  );
};

export default Logout;
