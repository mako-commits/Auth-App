import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import PublicAccessPage from "./pages/PublicAccessPage";
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage";
import RedirectPage from "./pages/RedirectPage";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/public">
          <PublicAccessPage />
        </Route>

        {!authCtx.isLoggedIn && (
          <Route path="/forgotten-password">
            <ForgottenPasswordPage />
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/forgotten-password-redirect">
            <RedirectPage />
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}

        <Route path="/change-password">
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
