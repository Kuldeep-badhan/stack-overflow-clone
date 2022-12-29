import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/user.routes.js'
import questionRoutes from './routes/question.route.js'
import answerRoutes from './routes/answer.route.js'
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

const DATABASE_URL = process.env.DATABASE_URL;

app.use(express.json({limit:'30mb',extended:true}));
app.use(express.urlencoded({limit:'30mb',extended:true}));
app.use('/users',userRoutes);
app.use('/question',questionRoutes);
app.use('/answer',answerRoutes);
mongoose.set('strictQuery', false);
mongoose.connect(DATABASE_URL)
    .then(()=>{app.listen(port,()=>{
        console.log(`App is listening at the port: ${port}`);
    })})
    .catch((err)=>console.log(err))






