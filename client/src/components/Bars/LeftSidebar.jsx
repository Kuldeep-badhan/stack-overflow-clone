import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiGlobe } from "react-icons/fi";
const LeftSidebar = () => {
  return (
    <div className="sidebar-nav">
      <NavLink to="/" activeClassName="active">
        Home
      </NavLink>
      <Link>
        Public
      </Link>
      <ul>
        <li>
          {" "}
          <NavLink to={"/questions"} activeClassName="active">
            {" "}
            <FiGlobe id="globe-icon" /> Questions{" "}
          </NavLink>{" "}
        </li>
        <li>
          {" "}
          <NavLink to={"/tags"} activeClassName="active">
            {" "}
            Tags{" "}
          </NavLink>{" "}
        </li>
        <li>
          {" "}
          <NavLink to={"/users"} activeClassName="active">
            {" "}
            Users{" "}
          </NavLink>{" "}
        </li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
