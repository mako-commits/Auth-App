import classes from "./AuthForm.module.css";
import { Tab, Tabs } from "react-bootstrap";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const AuthForm = () => {
  return (
    <section className={classes.auth}>
      {/* <h1>{isLogin ? "Login" : "Sign Up"}</h1> */}
      <Tabs defaultActiveKey="signIn" id="tab" className="mb-3" justify>
        <Tab eventKey="signUp" title="Sign Up" className={classes.active}>
          <SignUp />
        </Tab>
        <Tab eventKey="signIn" title="Sign In" className={classes.active}>
          <SignIn />
        </Tab>
      </Tabs>
    </section>
  );
};

export default AuthForm;
