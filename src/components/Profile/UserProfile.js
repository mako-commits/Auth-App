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
  const [isVerified, setIsVerified] = useState(null);
  const [user, setUser] = useState([]);

  const id = authCtx.token;

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
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            //show error modal
            console.log(data.error.message);
            if (data && data.error && data.error.message) {
              alert(data.error.message);
            } else {
              alert("Something went wrong");
            }
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        setUser(data.users[0]);
        if (data.users[0].emailVerified) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <section className={classes.profile}>
      <h1>Your User Profile Page</h1>

      {isVerified && (
        <h5>
          {" "}
          Your email <em>{user.email}</em> has been verified!
        </h5>
      )}
      {!isVerified && (
        <p>
          {" "}
          Your email<em>{user.email}</em> has not been verified!
        </p>
      )}
      <p>
        This page can only be accessed if you are an authenticated user. You
        also have access to perform the following actions like
      </p>
      <div className={classes.actions}>
        <Link to="/change-password">
          <Button variant="dark">Change Password</Button>
        </Link>
        <VerifyEmail />
        <Logout />
        <DeleteAccount />
      </div>
    </section>
  );
};

export default UserProfile;
