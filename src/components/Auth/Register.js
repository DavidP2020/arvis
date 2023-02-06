import { TextField } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../../index.css";

const Register = () => {
  const navigate = useNavigate();

  // Function Untuk login menggunakan google
  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/dashboard");
      })
      .catch((err) => {
        console.info(err);
      });
  };

  // Function Untuk register menggunakan email  & password
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;

    if (password !== password2) {
      return alert("Password Do Not Match");
    }

    if (password < 8) {
      return alert("Password Must be 8 in Length");
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.user));
        alert("Success Create Account");
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
        <form className="form" autoComplete="off" onSubmit={handleRegister}>
          <h1 className="text-4xl text-center">Register</h1>
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

          <div className="flexInput">
            <TextField
              required
              id="password2"
              name="password2"
              label="Confirm Password"
              type="password"
              variant="standard"
              placeholder="Confirm Password"
            />
          </div>

          <div className="flexButton">
            <button className="buttonPrimary" type="submit">
              Create Account
            </button>
            <div className="text-center text-sm">OR</div>

            <button
              className="buttonGoogle"
              type="button"
              onClick={handleGoogleLogin}
            >
              <i className="fab fa-google mr-1 text-lg"></i> Sign Up With Google
            </button>
            <div className="text-center text-xs">
              Already Have An Account ? <Link to="/login">Sign In</Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Register;
