import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postQuestion } from "../../reducers/question.js";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questioTags, setQuestionTags] = useState("");
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const userPosted = user.result.name;
    const userId = user.result._id;
    let questionTags = questioTags.split(" ");
    questionTags = questionTags.pop();
    console.log(questionTags, "Ask question container");
    const queData = { questionTitle, questionBody, questionTags, userPosted, userId };
    dispatch(postQuestion(queData));
    navigate("/");
  }
  function keyHandler(e) {
    if (e.key === "Enter") setQuestionBody(questionBody + "\n");
  }
  return (
    <div className="askque-container">
      <h1>Ask Questions</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <p>
          Be specific and imagine you are asking the question to another person.
        </p>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="e.g. how to send an ajax request from the client side."
          required
          onChange={(e) => setQuestionTitle(e.target.value)}
        />

        <label htmlFor="body">Body</label>
        <p>
          Include all the information someone would need to answer your
          question.
        </p>
        <textarea
          name="body"
          id="body"
          cols="30"
          rows="5"
          onChange={(e) => setQuestionBody(e.target.value)}
          onKeyDown={keyHandler}
        ></textarea>
        <label htmlFor="tags">Tags</label>
        <p>Add up to 5 tags to tell what your question is about.</p>
        <input
          type="text"
          name="tags"
          id="tags"
          required
          placeholder="e.g. xml fetch"
          onChange={(e) =>{
            setQuestionTags(e.target.value)
          }}
        />
        <button type="submit">Review Your Question</button>
      </form>
    </div>
  );
};

export default AskQuestion;
