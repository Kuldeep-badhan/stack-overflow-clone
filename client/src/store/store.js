import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../reducers/auth.js'
import answerReducer from '../reducers/answer.js'
import questionReducer from '../reducers/question.js'
import userReducer from '../reducers/user.js'
const store = configureStore({
    reducer:{
        auth: authReducer,
        answer: answerReducer,
        question: questionReducer,
        user: userReducer,
    }
})


export default store;