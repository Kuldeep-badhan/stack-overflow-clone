import mongoose from "mongoose";
import Question from "../model/question.model.js";

export const askQuestion = async (req, res) => {
  const postQuestionData = req.body;
  const postQuestion = new Question({ ...postQuestionData });
  try {
    postQuestion.save();
    res.status(200).json("The qustion was saved successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Unable to post new Question");
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const qustionList = await Question.find();
    res.status(200).json(qustionList);
  } catch (error) {
    console.log(error);
    res.status(404).josn({message:"This list was not found"});
  }
};

export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).json("Question is unavailable.");
  try {
    const response = await Question.findByIdAndDelete(id);
    res.status(200).json("Successfully deleted the Question." + response.data);
  } catch (error) {
    res.status(500).json("Server error");
  }
};

export const voteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const { userId, vote } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json("Question is unavailable.");
  }

  const question = await Question.findById(_id);
  const upIndex = question.upVote.findIndex((id) => id === String(userId));
  const downIndex = question.downVote.findIndex((id) => id === String(userId));

  try {
    if (vote === "upVote") {
      if (downIndex !== -1) {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
      if (upIndex === -1) {
        question.upVote.push(userId);
      } else if (upIndex !== -1) {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
    } 
    else if (vote === "downVote") {
      if (upIndex !== -1) {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
      if (downIndex === -1) {
        question.downVote.push(userId);
      } else if (downIndex !== -1) {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
    }
    const response = await Question.findByIdAndUpdate(_id, question);
    res.status(200).json({message:"Vote successfuly updated."});
  } catch (error) {
    res.status(500).json({message:"Server Error"});
  }
};
