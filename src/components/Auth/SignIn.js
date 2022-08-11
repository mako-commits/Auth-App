import React from "react";
import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./AuthForm.module.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const SignIn = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //Handle form submission
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //* Add extra validation
    setIsLoading(true);

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= ${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            //show error modal
            // console.log(data.error.message);
            // let errorMessage = "Authentication failed";
            if (data && data.error && data.error.message) {
              alert(data.error.message);
              setErrorMessage(data.error.message);
            } else {
              alert("Something went wrong");
            }
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        //transform
        //get current time and add it expiresIn and multiply bt 1000 to convert to millisecond
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        setErrorMessage("");
        history.replace("/profile");
      })
      .catch((error) => {
        // setErrorMessage(data.error.message);
        alert(error.message);
        setIsLoading(false);
        // console.log(error.message);
      });
  };
  return (
    <>
      <h1 className="my-5  text-dark">Sign in to your account.</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            size="lg"
            type="email"
            placeholder="Email Address"
            required
            ref={emailInputRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Control
            size="lg"
            type="password"
            placeholder="Password"
            required
            ref={passwordInputRef}
          />
        </Form.Group>
        <div className={classes.actions}>
          <Button variant="primary" type="submit" size="lg" className="my-3">
            {isLoading ? "Loading…" : "Sign In"}
          </Button>
          <Link to="/forgotten-password" className={classes.link}>
            Forgot your password?
          </Link>
          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
        </div>
      </Form>
    </>
  );
};

export default SignIn;
