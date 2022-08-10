import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

const API_KEY = process.env.REACT_APP_API_KEY;

const VerifyEmail = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const id = authCtx.token;
  // console.log(id);
  const verifyEmailHandler = () => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res, data) => {
        setIsLoading(false);
        if (res.ok) {
          // const userInfo = data;
          // console.log(userInfo);
          return res.json().then((data) => {
            console.log(data.email);
            const email = data.email;
            alert(`Email Verification sent to ${email}`);
          });
        } else {
          return res.json().then((data) => {
            //show error modal
            console.log(data.error.message);
            if (data && data.error && data.error.message) {
              setErrorMessage(data.error.message);
            }
            // alert(data.error.message);
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        //transform
        //get current time and add it expiresIn and multiply bt 1000 to convert to millisecond
        // const expirationTime = new Date(
        //   new Date().getTime() + +data.expiresIn * 1000
        // );
        // authCtx.login(data.idToken, expirationTime.toISOString());
        // setErrorMessage("");
      })
      .catch((error, data) => {
        // setErrorMessage(data.error.message);
        alert(error.message);
        // console.log(error.message);
      });
  };
  return (
    <button onClick={verifyEmailHandler} className="btnAlt">
      Verify Email
    </button>
  );
};

export default VerifyEmail;
