import Question from "../model/question.model.js";
import mongoose from "mongoose";

export const postAnswer = async (req, res) => {
  const { id } = req.params;
  const { noOfAnswers, answerBody, userAnswered, userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json("Question is not available.");
  }

  try {
    const answer = await Question.findByIdAndUpdate(id, {
      $addToSet: { answer: [{ answerBody, userAnswered, userId}] },
    });
    updateNoOfAnswers(id, noOfAnswers);
    res.status(200).json(answer);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateNoOfAnswers = async (id, noOfAnswers) => {
  console.log("noOfAnswers",noOfAnswers);
  try {
    await Question.findByIdAndUpdate(id, {
      $set: { noOfAnswers: noOfAnswers },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = async (req, res) => {
  const { id } = req.params;
  const { answerId, noOfAnswerss } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json("Question is not available.");
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    res.status(404).json("answer is not available.");
  }
  updateNoOfAnswers(id, noOfAnswerss);
  try {
    const response = await Question.updateOne(
      { _id: id },
      { $pull: { answer: { _id: answerId } } }
    );
  } catch (error) {
    res.status(500).json("server error");
  }
};
