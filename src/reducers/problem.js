import { GET_PROBLEM, POST_USER_ANSWER, GET_CORRECT_ANSWER, TRY_AGAIN } from '../actionTypes/problem';

const INITIAL_VALUE = {
                        latex: null, 
                        problemType: null, 
                        args: null,
                        userAnswer: null,
                        correctAnswer: null, 
                        status: null,
                        previousUserAnswers: []
                       };

const problem = (state = INITIAL_VALUE, action) => {
    switch (action.type) {
        case GET_PROBLEM: {
            return {...state, 
                    latex: action.latex, 
                    problemType: action.problemType,
                    args: action.args,                        
                    userAnswer: null,
                    correctAnswer: null, 
                    status: null,
                    previousUserAnswers: []
                    }
        }
        case POST_USER_ANSWER: {
            return {...state,
                    userAnswer: action.userAnswer,
                    status: action.status,
                    previousUserAnswers: [...state.previousUserAnswers, action.userAnswer]
                    }
        }
        case GET_CORRECT_ANSWER: {
            return {...state,
                    correctAnswer: action.correctAnswer,  
                    status: 'showCorrect'
                    }
        }
        case TRY_AGAIN: {
            return {...state,
                    status: null            
                    }
        }
        default: return state;
    }

}

export default problem;