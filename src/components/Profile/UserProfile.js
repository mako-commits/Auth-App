import classes from "./UserProfile.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext, useState, useEffect } from "react";
import VerifyEmail from "../Actions/VerifyEmail";
import DeleteAccount from "../Actions/DeleteAccount";
import Button from "react-bootstrap/Button";
import Logout from "../Actions/Logout";

const API_KEY = process.env.REACT_APP_API_KEY;

const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(null);
  const [user, setUser] = useState([]);

  const id = authCtx.token;
  // console.log(id);

  const fetchUserData = () => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res, data) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json().then((data) => {
            setUser(data.users[0]);
            // console.log(data.users[0]);
            if (data.users[0].emailVerified) {
              setIsVerified(true);
            } else {
              setIsVerified(false);
            }
          });
        } else {
          return res.json().then((data) => {
            //show error modal
            console.log(data.error.message);
            // let errorMessage = "Authentication failed";
            if (data && data.error && data.error.message) {
              setErrorMessage(data.error.message);
            }
            // alert(data.error.message);
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        // setErrorMessage("");
      })
      .catch((error, data) => {
        // setErrorMessage(data.error.message);
        alert(error.message);
        // console.log(error.message);
      });
    // const date = new Date(user[0].createdAt).getDate();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <section className={classes.profile}>
      <h1>Your User Profile Page</h1>
      <p>
        This page can only be accessed if you are an authenticated user. You
        also have access to perform the following actions like
      </p>

      {isVerified && <h5> Your email {user.email} has been verified!</h5>}
      {!isVerified && <p> Your email {user.email} has not been verified!</p>}

      <div className={classes.actions}>
        <Link to="/change-password">
          <button className={classes.btn}>Change Password</button>
        </Link>
        <VerifyEmail />
        <Logout />
        <DeleteAccount />
      </div>
    </section>
  );
};

export default UserProfile;
