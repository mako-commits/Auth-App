import React from "react";
import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import classes from "./AuthForm.module.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const SignUp = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  //   const [isLogin, setIsLogin] = useState(true);
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
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
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
      <h3 className="mb-3">Create your account</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="email"
            placeholder="Email Address"
            required
            ref={emailInputRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Control
            type="password"
            placeholder="Password"
            required
            ref={passwordInputRef}
          />
        </Form.Group>
        <div className={classes.actions}>
          <Button variant="primary" type="submit">
            {isLoading ? "Loading…" : "Sign Up"}
          </Button>

          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
        </div>
      </Form>
    </>
  );
};

export default SignUp;
