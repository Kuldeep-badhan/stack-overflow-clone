import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import decode from "jwt-decode";

import logo from "../../assets/logo.png";
import Avatar from "../Utility/Avatar";
import { logout, setUserNull, fetchUserData } from "../../reducers/auth.js";

const Navbar = () => {
  let user = useSelector((state) => {
    return state.auth.userData;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem("profile");
    if (userData === undefined) {
      console.log("user data not available");
    } else {
      dispatch(fetchUserData());
    }
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        console.log("logout");
        handleLogout();
      }
    }
  }, [dispatch]);

  function handleLogout() {
    console.log("log out handler");
    dispatch(logout());
    navigate("/");
    dispatch(setUserNull());
  }

  return (
    <div className="nav-wrapper">
      <nav>
        <div className="navbar">
          <Link to="/" className="logo">
            <img src={logo} alt="logo" />
          </Link>
          <Link to={"/"}>About</Link>
          <Link to={"/"}>Products</Link>
          <Link to={"/"}>For Teams</Link>
          <form className="serch">
            <input type="text" placeholder="Search..." />
            <AiOutlineSearch className="search-icon" />
          </form>
          {user === null ? (
            <Link to={"/auth"} className="nav-btn">
              Log In
            </Link>
          ) : (
            <>
              <Link
                to={`users/${user.result._id}`}
                style={{ color: "white", textDecoration: "none" }}
                className={"avatar-link"}
              >
                <Avatar
                  letter={user.result.name.charAt(0).toUpperCase()}
                  backgroundColor={"blue"}
                  borderRadius={"50%"}
                  py={"0.4rem"}
                  px={"0.7rem"}
                />
              </Link>

              <button onClick={handleLogout} className="nav-btn">
                Log out
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
