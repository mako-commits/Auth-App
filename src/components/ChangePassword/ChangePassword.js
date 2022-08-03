import classes from "./ChangePassword.module.css";
import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;
const ChangePassword = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const newSecondPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    const enteredSecondPassword = newSecondPasswordInputRef.current.value;

    if (enteredNewPassword.length < 7) {
      alert("Password must be at least 7 characters long");
      return;
    }
    if (enteredNewPassword !== enteredSecondPassword) {
      alert("Passwords do not match");
      return;
    }

    //* Add extra validation

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        history.replace("/");
        alert("password changed successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className={classes.changePassword}>
      <h1>Change Password</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="new-password">Enter New Password</label>
          <input
            type="password"
            minLength="7"
            id="new-password"
            ref={newPasswordInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="new-second-password">Confirm New Password</label>
          <input
            type="password"
            minLength="7"
            id="new-password"
            ref={newSecondPasswordInputRef}
          />
        </div>

        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      </form>
    </section>
  );
};

export default ChangePassword;
