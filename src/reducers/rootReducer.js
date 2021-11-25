import { GET_PROBLEM, POST_USER_ANSWER, GET_CORRECT_ANSWER, TRY_AGAIN } from '../actions/actionTypes';

const INITIAL_VALUE = { problem: {
                            latex: null, 
                            problemType: null, 
                            args: null,
                            userAnswer: null,
                            correctAnswer: null, 
                            status: null,
                            previousUserAnswers: []
                        },
                        timer: {
                            initialTime: 0,
                            time: 0
                        }, 
                        scores: {
                            skill: {
                            },
                            totalCorrect: 0,
                            totalAttempts: 0
                        } 
                       };

const rootReducer = (state = INITIAL_VALUE, action) => {
    switch (action.type) {
        case GET_PROBLEM: {
            return {...state, 
                        problem: {...state.problem, 
                            latex: action.latex, 
                            problemType: action.problemType,
                            args: action.args,                        
                            userAnswer: null,
                            correctAnswer: null, 
                            status: null,
                            previousUserAnswers: []
                        }
                    }
        }

        case POST_USER_ANSWER: {
            const scoresCopy = {...state.scores};
            const correct = action.status==='correct' ? 1 : 0;
            const incorrect = action.status==='incorrect' ? 1 : 0;

            scoresCopy.totalCorrect = state.scores.totalCorrect + correct;
            scoresCopy.totalAttempts = state.scores.totalAttempts + 1;

            scoresCopy.skill[state.problem.problemType] = {
                correct : state.scores.skill[state.problem.problemType] ? 
                            state.scores.skill[state.problem.problemType].correct + correct
                            : correct,
                incorrect: state.scores.skill[state.problem.problemType] ? 
                            state.scores.skill[state.problem.problemType].incorrect + incorrect
                            : incorrect,
                attempted: state.scores.skill[state.problem.problemType] ? 
                            state.scores.skill[state.problem.problemType].attempted + 1
                            : 1,
            }

            return {...state, 
                        problem: {...state.problem, 
                            userAnswer: action.userAnswer,
                            status: action.status,
                            previousUserAnswers: [...state.problem.previousUserAnswers, action.userAnswer]
                        },
                        scores: scoresCopy
                    }
        }

        case GET_CORRECT_ANSWER: {
            const scoresCopy = {...state.scores};
            scoresCopy.totalAttempts = state.scores.totalAttempts + 1;

            scoresCopy.skill[state.problem.problemType] = {
                correct : state.scores.skill[state.problem.problemType] ? 
                            state.scores.skill[state.problem.problemType].correct
                            : 0,
                incorrect: state.scores.skill[state.problem.problemType] ? 
                            state.scores.skill[state.problem.problemType].incorrect
                            : 0,
                attempted: state.scores.skill[state.problem.problemType] ? 
                            state.scores.skill[state.problem.problemType].attempted + 1
                            : 1,
            }

            return {...state,
                        problem: {...state.problem, 
                            correctAnswer: action.correctAnswer,  
                            status: 'showCorrect'
                        },
                        scores: scoresCopy
                    }          
        }

        case TRY_AGAIN: {
            return {...state,
                        problem: {...state.problem,
                            status: null            
                        }
                    }
        }
        default: return state;
    }

}

export default rootReducer;
