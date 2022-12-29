import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SignUp, LogIn } from "../../reducers/auth.js";
import icon from "../../assets/icon.png";

const Auth = () => {
  const [isSignup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick() {
    setSignup(!isSignup);
  }
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const LogInData = { email, password };
    dispatch(LogIn(LogInData));
    navigate("/");
  };
  const handleSubmitSignup = (e) => {
    e.preventDefault();
    const SignUpData = { name, email, password };

    dispatch(SignUp(SignUpData));
    navigate("/")
  };
  return (
    <>
      {!isSignup ? (
        <div className="login">
          <div className="logo">
            <img src={icon} alt="icon" />
          </div>
          <form onSubmit={handleSubmitLogin}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="password">
              Password <a href="#aldflf">forget password?</a>
            </label>

            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button type="submit">Log In</button>
          </form>
          <div className="sign-up-prompt">
            Don't have an account?{" "}
            <button onClick={handleClick}>Sign Up </button>
          </div>
        </div>
      ) : (
        <div className="signup-container">
          <aside>
            <article>
              <h2>Join the Stack Overflow community</h2>
              <p>
                Get unstuck - ask a question Unlock new privileges like voting
                and commenting Save your favorite tags, filters, and jobs Earn
                reputation and badges.
              </p>
              <small>
                Collaborate and share knowledge with a private group
              </small>
              <a href="#dslfjs">
                Get Stack Overflow for Teams free for up to 50 users
              </a>
            </article>
          </aside>
          <div className="signup">
            <form onSubmit={handleSubmitSignup}>
              <label htmlFor="name">Display name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <p className="font-light" style={{ color: "#666767" }}>
                Password must contain at least eight characters. Including at
                least 1 letter and 1 number
              </p>
              <div className="notify-checkbox-div">
                <input
                  type="checkbox"
                  name="notify-checkbox"
                  id="notify-checkbox"
                />
                <label htmlFor="notify-checkbox">
                  Opt-in to receive occasional product updates,user research
                  invitations, company announcements, and digests.
                </label>
              </div>
              <button id="signup-btn">Sign Up</button>
              <p className="font-light" style={{ color: "#666767" }}>
                By clicking "Sign up", you agree to our
                <span style={{ color: "#007ac6" }}>
                  {" "}
                  terms of services, privacy policy and cokkie policy.{" "}
                </span>
              </p>
            </form>
            <div className="login-prompt">
              Already have an account?{" "}
              <button onClick={handleClick}>Log In </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
