import classes from "./UserProfile.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext, useState } from "react";
import VerifyEmail from "../VerifyEmail/VerifyEmail";

const API_KEY = process.env.REACT_APP_API_KEY;
const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  const [fetchUser, setFetchUser] = useState(true);
  const [deleteAcct, setDeleteAcct] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(null);
  const [user, setUser] = useState([]);
  const logoutHandler = () => {
    authCtx.logout();
  };
  const id = authCtx.token;
  console.log(id);

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
          // const userDetails = res.json().then((data) => {
          //   const user = data.users[0];
          //   console.log(user);
          // });
          // return userDetails;
          return res.json().then((data) => {
            setUser(data.users);
            console.log(data.users[0]);
            // if (data.users[0].emailVerified === true) {
            //   setIsVerified(true);
            // } else {
            //   setIsVerified(false);
            // }
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
        //transform
        //get current time and add it expiresIn and multiply bt 1000 to convert to millisecond
        // const expirationTime = new Date(
        //   new Date().getTime() + +data.expiresIn * 1000
        // );
        // authCtx.login(data.idToken, expirationTime.toISOString());
        // setErrorMessage("");
      })
      .catch((error, data) => {
        // setErrorMessage(data.error.message);
        alert(error.message);
        // console.log(error.message);
      });
  };

  // if (user[0].emailVerified === true) {
  //   setIsVerified(true);
  // } else {
  //   setIsVerified(false);
  // }
  return (
    <section className={classes.profile}>
      <h1>Your User Profile Page</h1>
      <p>
        This page can only be accessed if you are an authenticated user. You
        also have access to perform action like{" "}
        <mark>
          <em>change account password </em>{" "}
        </mark>
        and{" "}
        <mark>
          <em> logout of your account </em>
        </mark>
      </p>

      <div>
        {isVerified && <p> Your email has been verified</p>}
        {!isVerified && <p> Your email has not been verified</p>}
      </div>
      <div>
        {user.map((item) => {
          return (
            <div>
              <h3>Email: {item.email}</h3>
              <h3>Account Created At: {item.createdAt}</h3>
            </div>
          );
        })}
      </div>
      <div className={classes.access}>
        <button onClick={fetchUserData} className={classes.btn}>
          Get user Details
        </button>
        <VerifyEmail />
      </div>
      <div className={classes.actions}>
        <Link to="/change-password">
          <button className={classes.btn}>Change Password</button>
        </Link>

        <button onClick={logoutHandler} className="btnAlt">
          Logout
        </button>
      </div>
    </section>
  );
};

export default UserProfile;
