import express from 'express'
import {askQuestion,getAllQuestions, deleteQuestion,voteQuestion} from '../controller/question.controller.js'
import auth from '../middleware/auth.middleware.js';
const router = express.Router();

router.post("/ask",auth,askQuestion)
router.get("/get",getAllQuestions)
router.delete("/delete/:id",auth,deleteQuestion)
router.put("/vote/:id",auth,voteQuestion)

export default router;