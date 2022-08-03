import classes from "./StartingPageContent.module.css";

const StartingPageContent = () => {
  return (
    <section className={classes.starting}>
      <h1>Welcome!</h1>
      <h6>This is the homepage</h6>
      <p>You do not need authentication to view this page</p>
    </section>
  );
};

export default StartingPageContent;
