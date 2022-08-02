import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import FreePage from "./pages/FreePage";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/free">
          <FreePage />
        </Route>

        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}

        <Route path="/changePassword">
          {authCtx.isLoggedIn && <ChangePasswordPage />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>

        <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>

        <Route path="*">
          {/* render a 404 page */}
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
