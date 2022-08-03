import classes from "./StartingPageContent.module.css";

const StartingPageContent = () => {
  return (
    <section className={classes.starting}>
      <h1>Welcome to Auth App homepage</h1>
      <p>You do not need authentication to view this page</p>
    </section>
  );
};

export default StartingPageContent;
