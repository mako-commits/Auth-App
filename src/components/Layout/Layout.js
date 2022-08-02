import { Fragment } from "react";

import MainNavigation from "./MainNavigation";
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <Fragment>
      {/* <MainNavigation /> */}
      <Navbar />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
