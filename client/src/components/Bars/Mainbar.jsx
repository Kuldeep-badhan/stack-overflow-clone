import React, {useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import moment from 'moment'

import { getAllQuestions } from "../../reducers/question.js";

const Mainbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const questionsList = useSelector(state => state.question.questionsList);
  const user = 1;
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getAllQuestions());
    setTimeout(()=>{

      console.log(questionsList, "I am mainbar");
    },2000)
},[dispatch])

  function handleClick() {
    if (user) {
      navigate("/askquestion");
    } else {
      navigate("/auth");
    }
  }

  return (
    <>
  {
    questionsList === null ? <h2>Loading...</h2> :
    <main className="main-bar">
      <div className="mainbar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : location.pathname === "/questions" ? (
          <h1>All Questions</h1>
        ) : (
          ""
        )}

        <button onClick={handleClick}> Ask Question </button>
      </div>

      <strong className="que-qty"> {questionsList.length} Questions </strong>
      <div className="questions">
        {questionsList.map((que) => {
          return (
            <div className="question" key={que._id}>
              <div className="votes">
                {" "}
                <span>{que.upVote.length + que.downVote.length}</span> <span>votes</span>{" "}
              </div>
              <div className="answers">
                {" "}
                <span>{que.answer.length}</span> <span>answers</span>{" "}
              </div>
              <div className="title-tags">
                {" "}
                <h4>
                  {" "}
                  <Link to={`/questions/${que._id}`}>
                    {" "}
                    {que.questionTitle}{" "}
                  </Link>
                </h4>
                <div className="tags">
                  {que.questionTags.map((tag) => (
                    <span>{tag}</span>
                  ))}
                </div>
                <p className="asked-on">asked on {moment(que.askedOn).fromNow()} by {que.userPosted}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  }

    
    </>
  );
};

export default Mainbar;
