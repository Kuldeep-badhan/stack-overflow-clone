import React from "react";
import RightSidebar from "../Bars/RightSidebar";
import LeftSidebar from "../Bars/LeftSidebar";
import Mainbar from "../Bars/Mainbar";

const Questions = () => {
  return (
    <div className="home">
      <LeftSidebar />
      <div className="home-right-container">
        <RightSidebar />
        <Mainbar />
      </div>
    </div>
  );
};

export default Questions;
