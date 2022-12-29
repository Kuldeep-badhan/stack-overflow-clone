import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import copy from "copy-to-clipboard";

import Avatar from "../Utility/Avatar";
import { deleteAnswer, postAnswer } from "../../reducers/answer.js";
import {
  deleteQuestion,
  getAllQuestions,
  updateVote,
} from "../../reducers/question.js";
import { fetchUserData } from "../../reducers/auth.js";



const Question = () => {
  const [loading, setLoading] = useState(true);
  const [answerBody, setAnswerBody] = useState("");
  const [noOfAnswers, setNoOfAnswers] = useState("");

  const user = useSelector((state) => state.auth.userData);
  const questionsList = useSelector((state) => state.question.questionsList);

  const location = useLocation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const url = "http://localhost:3000";


  useEffect(() => {

    dispatch(getAllQuestions());

    dispatch(fetchUserData());

    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }, [noOfAnswers, dispatch]);

  function submitHandler(e) {
    e.preventDefault();

    const userAnswered = user.result.name;
    const userId = user.result._id;
    const answerData = [{ userAnswered, answerBody, noOfAnswers, userId }, id];

    console.log([{ userAnswered, answerBody, noOfAnswers, userId }, id]);

    dispatch(postAnswer(answerData));
    dispatch(getAllQuestions());
  }

  function handleShare() {
    copy(url + location.pathname);
    alert("Share link has been copied to your clipboard");
  }
  function deleteHandler() {
    dispatch(deleteQuestion(id));
    navigate("/");
  }

  function ansDeleteHandler(answerId, noOfAnswerss) {
    const ansData = [id, { answerId, noOfAnswerss }];
    dispatch(deleteAnswer(ansData));
    dispatch(getAllQuestions());
  }

  function votesHandler(vote) {
    const userId = user.result._id;
    const voteData = [id, { vote, userId }];
    if (vote === "upVote") {
      console.log(id, vote, userId);
      dispatch(updateVote(voteData));
      setTimeout(() => {
        dispatch(getAllQuestions());
      }, 1000);
    } else if (vote === "downVote") {
      console.log(id, vote, userId);
      dispatch(updateVote(voteData));
      setTimeout(() => {
        dispatch(getAllQuestions());
      }, 1000);
    }
  }

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          {questionsList
            .filter((question) => question._id === id)
            .map((que) => {
              return (
                <div className="question-stats-container">
                  <h2> {que.questionTitle}</h2>
                  <div className="question-stats">
                    <div className="votes">
                      <span onClick={() => votesHandler("upVote")}>
                        <TiArrowSortedUp className="arrow-icon" />{" "}
                      </span>
                      <span> {que.upVote.length - que.downVote.length}</span>
                      <span onClick={() => votesHandler("downVote")}>
                        {" "}
                        <TiArrowSortedDown className="arrow-icon" />
                      </span>
                    </div>
                    <div className="que-details">
                      <span>{que.questionBody}</span>
                      <div className="que-details-tags">
                        {que.questionTags.map((tag) => {
                          return <span key={tag}>{tag}</span>;
                        })}
                      </div>
                      <div className="share-delete">
                        <button onClick={handleShare}>share</button>
                        {user.result._id === que.userId ? (
                          <button
                            onClick={() => {
                              deleteHandler();
                            }}
                          >
                            delete
                          </button>
                        ) : (
                          null
                        )}
                      </div>
                    </div>
                    <div className="user-data-container">
                      <div className="user-data">
                        <p>asked on {moment(que.askedOn).fromNow()}</p>
                        <div className="user">
                          <Link to={`/users/${que.userId}`}>
                            {" "}
                            <Avatar
                              letter={que.userPosted.charAt(0)}
                              backgroundColor={"green"}
                              borderRadius={"5px"}
                              py={"2px"}
                              px={"10px"}
                              color={"white"}
                            />{" "}
                          </Link>
                          <Link to={`/users/${que.userId}`}>
                            {que.userPosted}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {que.answer.length ? (
                    <div className="answers">
                      <h4>{que.answer.length} Answers</h4>
                      {que.answer.map((answer) => {
                        return (
                          <div key={answer.userId} className="answer">
                            <p> {answer.answerBody} </p>
                            <div className="share-delete">
                              <button type="button" onClick={handleShare}>
                                share
                              </button>
                              {user?.result._id === answer?.userId ? (
                                <button
                                  onClick={() => {
                                    ansDeleteHandler(
                                      answer._id,
                                      que.noOfAnswers - 1
                                    );
                                  }}
                                >
                                  delete
                                </button>
                              ) : (
                                null
                              )}
                            </div>
                            <div className="user-data-container">
                              <div className="user-data">
                                <p>
                                  answered on{" "}
                                  {moment(answer.answeredOn).fromNow()}
                                </p>
                                <div className="user">
                                  <Link to={`/users/${answer.userId}`}>
                                    {" "}
                                    <Avatar
                                      letter={answer.userAnswered
                                        .charAt(0)
                                        .toUpperCase()}
                                      backgroundColor={"green"}
                                      borderRadius={"5px"}
                                      py={"2px"}
                                      px={"10px"}
                                      color={"white"}
                                    />{" "}
                                  </Link>
                                  <Link to={`/users/${answer.userId}`}>
                                    {answer.userAnswered}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="no-answer-container">
                    <h2>No Answers Posted</h2>
                    </div>
                  )}

                  <form className="your-answer" onSubmit={submitHandler}>
                    <h2>Your Answer</h2>
                    <textarea
                      name="answer"
                      id="answer"
                      cols="30"
                      rows="5"
                      onChange={(e) => setAnswerBody(e.target.value)}
                    ></textarea>
                    <button
                      type="submit"
                      onClick={() => setNoOfAnswers(que.answer.length + 1)}
                    >
                      Post Your Answer
                    </button>
                  </form>
                  <p>
                    Browser other questions taged
                    {que.questionTags.map((tag) => {
                      return (
                        <Link to={`/tags/`} className="tag" key={tag}>
                          {" "}
                          {tag}
                        </Link>
                      );
                    })}
                    or ask you <Link to={"/askquestion/"}> own question. </Link>
                  </p>
                </div>
              );
            })}
        </>
      )}
    </>
  );
};

export default Question;
