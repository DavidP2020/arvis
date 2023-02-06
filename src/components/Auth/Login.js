import { TextField } from "@mui/material";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../../index.css";
const Login = () => {
  const navigate = useNavigate();

  // Function Untuk login menggunakan google
  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/dashboard");
      })
      .catch((err) => {
        console.info(err);
      });
  };

  // Function Untuk login menggunakan passowrd dan email
  const handleEmailPasswordLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.user));
        alert("Success Login");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {/* tampilan form */}
      <main className="screen">
        <form
          className="form"
          autoComplete="off"
          onSubmit={handleEmailPasswordLogin}
        >
          <h1 className="text-4xl text-center">Login</h1>
          <div className="flexInput">
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="Email@gmail.com"
              variant="standard"
            />
          </div>

          <div className="flexInput">
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="standard"
              placeholder="Password"
            />
          </div>

          <div className="flexButton">
            <button className="buttonPrimary">Sign In</button>
            <div className="text-center text-sm">OR</div>

            <button
              className="buttonGoogle"
              type="button"
              onClick={handleGoogleLogin}
            >
              <i className="fab fa-google mr-1 text-lg"></i> Sign In With Google
            </button>
            <div className="text-center text-xs">
              Don't Have An Account ? <Link to="/register">Sign In</Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
