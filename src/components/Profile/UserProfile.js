// import ProfileForm from './ProfileForm';
import classes from "./UserProfile.module.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <p>This page can only be accessed if you are an authenticated user</p>

      <Link to="/changePassword">Change Password</Link>

      {/* <ProfileForm /> */}
    </section>
  );
};

export default UserProfile;
