import classes from "./FreeAccess.module.css";

const FreeAccess = () => {
  return (
    <section className={classes.starting}>
      <h1>Public access page</h1>
      <p>You do not need authentication to view this page</p>
    </section>
  );
};

export default FreeAccess;
