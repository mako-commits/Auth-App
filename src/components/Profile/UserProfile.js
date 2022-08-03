import classes from "./UserProfile.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
  };
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
      <div className={classes.actions}>
        <Link to="/changePassword">
          <button className={classes.btn}>Change Password</button>
        </Link>

        <button onClick={logoutHandler} className={classes.logoutBtn}>
          Logout
        </button>
      </div>
    </section>
  );
};

export default UserProfile;
