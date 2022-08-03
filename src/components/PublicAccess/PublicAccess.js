import classes from "./PublicAccess.module.css";

const PublicAccess = () => {
  return (
    <section className={classes.starting}>
      <h1>Public access page</h1>
      <p>You do not need authentication to view this page</p>
    </section>
  );
};

export default PublicAccess;
