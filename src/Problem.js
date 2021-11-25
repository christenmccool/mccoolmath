import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProblemFromAPI, 
        postUserAnswerToAPI, 
        getCorrectAnswerFromAPI, 
        tryAgain } from './actions/problem';
import Expression from './Expression.js';
import UserInputForm from './UserInputForm.js';
import Message from './Message.js';
import Button from './Button.js';
import './Problem.css';


const Problem = () => {
    const problem = useSelector(state => state.problem);
    const dispatch = useDispatch();

    const newProbBtnRef = useRef();
    const tryAgainBtnRef = useRef();
    const inputFieldRef = useRef();

    useEffect(() => {
        if (problem.latex) return;
        dispatch(getProblemFromAPI());
    }, [dispatch]);

    useEffect(() => {
        if (!problem.status) {
            inputFieldRef.current.children[0].children[0].children[0].focus();
        }
        if (problem.status === 'incorrect') tryAgainBtnRef.current.focus();
        if (problem.status === 'correct' || problem.status === 'showCorrect') newProbBtnRef.current.focus();
    }, [problem.status])

    const getProblem = () => {
        dispatch(getProblemFromAPI());
    }

    const submitUserAnswer = (userAnswer) => {
        dispatch(postUserAnswerToAPI(problem.problemType, problem.args, userAnswer));
    }

    const getCorrectAnswer = () => {
        dispatch(getCorrectAnswerFromAPI(problem.problemType, problem.args));
    }

    const handleTryAgain = () => {
        dispatch(tryAgain());
    }

    return (
        <div className="Problem">
            <Expression latex={problem.latex} />
            <div className="Problem-main">
                {problem.status===null ?
                    <UserInputForm submitUserAnswer={submitUserAnswer} inputFieldRef={inputFieldRef}/> 
                    :
                    <Message />
                }
            </div>
            <div className="Problem-buttons">
                {problem.status===null ?
                    <>
                        <Button role="getAnswer" handleClick={getCorrectAnswer} />
                    </>
                    :
                    problem.status==='incorrect' ?
                        <>
                            <Button role="tryAgain" refToAccess={tryAgainBtnRef} handleClick={handleTryAgain} />
                            <Button role="getAnswer" handleClick={getCorrectAnswer} />
                        </>
                        :
                        <Button role="newProblem" refToAccess={newProbBtnRef} handleClick={getProblem} />
                }
            </div>
        </div>
    )
}

export default Problem;