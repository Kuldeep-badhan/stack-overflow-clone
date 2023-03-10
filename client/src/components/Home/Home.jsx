import React from "react";
import { useLocation, useParams } from "react-router-dom";

import RightSidebar from "../Bars/RightSidebar";
import LeftSidebar from "../Bars/LeftSidebar";
import Mainbar from "../Bars/Mainbar";
import Question from "../Question/Question";

const Home = () => {
  const location = useLocation();
  const params = useParams();
  return (
    <div className="home">
      <LeftSidebar />
      <div className="home-right-container">
        <RightSidebar />
        {location.pathname === "/" ? (
          <Mainbar />
        ) : location.pathname === `/questions/${params.id}` ? (
          <Question />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Home;
