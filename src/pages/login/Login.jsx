import { useRef, useEffect } from "react";
import "./login.css";
import { loginUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const {
    auth: { isFetching, error, isUserPresent }
  } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    isUserPresent === true && navigate("/");
  }, [isUserPresent, navigate, isFetching]);

  const handleClick = e => {
    e.preventDefault();
    dispatch(
      loginUser({
        email: email.current.value,
        password: password.current.value
      })
    );
  };

  const guestLoginHandler = e => {
    e.preventDefault();
    dispatch(
      loginUser({
        email: "ayanshukla4@gmail.com",
        password: "killa"
      })
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Pulse App</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Pulse App.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              className="loginInput"
              ref={password}
            />
            {error && (
              <span className="error-msg">Incorrect username or password</span>
            )}
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <p className="seperator">Or</p>
            <button onClick={guestLoginHandler} className="guestLogin">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Login as a Guest"
              )}
            </button>

            <button
              className="loginRegisterButton"
              disabled={isFetching ? true : false}
              onClick={() => navigate("/register")}
            >
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
