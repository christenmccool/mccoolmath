import { GET_PROBLEM, POST_USER_ANSWER, GET_CORRECT_ANSWER, TRY_AGAIN } from './actionTypes';
import axios from 'axios';

const BASE_URL = "http://localhost:3000/integerop/";

function getProblemFromAPI() {
  return async function(dispatch) {
    let res = await axios.get(BASE_URL);
    dispatch(getProblem(res.data));
  };
}

function getProblem(problem) {
    return { 
        type: GET_PROBLEM,
        latex: problem.latex,
        problemType: problem.problemType,
        args: problem.args
    };
}

function postUserAnswerToAPI(probType, args, answer) {
    return async function(dispatch) {
        let res = await axios.post(BASE_URL, {   
            probType,
            args,
            answer
        });
    dispatch(postUserAnswer(res.data.status, answer));
    }
}

function postUserAnswer(status, userAnswer) {
    return { 
        type: POST_USER_ANSWER,
        status, 
        userAnswer
    };
}

function getCorrectAnswerFromAPI(probType, args) {
    return async function(dispatch) {
        let res = await axios.post(BASE_URL, {   
            probType,
            args,
            answer: null,
            returnAnswer: true
        });
    dispatch(getCorrectAnswer(res.data.correctAnswer));
    }
}

function getCorrectAnswer(correctAnswer) {
    return { 
        type: GET_CORRECT_ANSWER,
        correctAnswer
    };
}

function tryAgain() {
    return {
        type: TRY_AGAIN
    }
}
  
export { getProblemFromAPI, postUserAnswerToAPI, getCorrectAnswerFromAPI, tryAgain };