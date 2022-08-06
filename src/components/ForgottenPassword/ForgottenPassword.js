import { useRef, useState } from "react";
// import { useHistory } from "react-router-dom";
import classes from "./ForgottenPassword.module.css";
import SuccessMessage from "./SuccessMessage";
const API_KEY = process.env.REACT_APP_API_KEY;

const ForgottenPassword = () => {
  // const history = useHistory();
  const enteredEmailInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredUserEmail = enteredEmailInputRef.current.value;
    setIsLoading(true);
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredUserEmail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          alert("Password Reset Email Sent");
          setSuccess(true);
          // history.replace("/forgotten-password-redirect");
          // console.log(res.json());
          return res.json();
        } else {
          res.json().then((data) => {
            if (data && data.error && data.error.message) {
              alert(data.error.message);
              // console.log(data.error.message);
              throw new Error(data.error.message);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        setIsLoading(false);
      });
  };

  return (
    <section className={classes.resetPassword}>
      {!success && (
        <div>
          <h1>Forgotten Password</h1>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor="user-email">Enter Email Adddress</label>
              <input
                type="email"
                id="user-email"
                required
                ref={enteredEmailInputRef}
              />
            </div>
            <div className={classes.action}>
              {!isLoading && <button>Reset Password</button>}

              {isLoading && <button>Sending...</button>}

              {/* {errorMessage && <p className={classes.error}>{errorMessage}</p>} */}
            </div>
          </form>
        </div>
      )}

      {success && <SuccessMessage />}
    </section>
  );
};

export default ForgottenPassword;
