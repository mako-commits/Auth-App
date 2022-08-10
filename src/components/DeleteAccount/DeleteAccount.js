import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

const API_KEY = process.env.REACT_APP_API_KEY;

const DeleteAccount = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  //get user id
  const id = authCtx.token;

  const deteleAccountHandler = () => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        authCtx.logout();
        alert("Account Deleted");
      } else {
        return res.json().then((data) => {
          if (data && data.error && data.error.message) {
            // setErrorMessage(data.error.message);
            alert(data.error.message);
            throw new Error(data.error.message);
          }
        });
      }
    });
  };
  return (
    <button onClick={deteleAccountHandler} className="btnAlt">
      Delete Account
    </button>
  );
};

export default DeleteAccount;
