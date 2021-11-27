import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProblemFromAPI, 
        postUserAnswerToAPI, 
        getCorrectAnswerFromAPI, 
        tryAgain } from './actions/actions';
import Expression from './Expression.js';
import UserInputForm from './UserInputForm.js';
import Message from './Message.js';
import Button from './Button.js';
import './Problem.css';
import { getRoles } from '@testing-library/dom';


const Problem = () => {
    const problem = useSelector(state => state.problem);
    const dispatch = useDispatch();

    const newProbBtnRef = useRef();
    const tryAgainBtnRef = useRef();
    const inputFieldRef = useRef();

    useEffect(() => {
        if (problem.latex) return;
        dispatch(getProblemFromAPI());
    }, [problem.latex, dispatch]);

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

    const buttonRole = () => {
        switch (problem.status) {
            case null:
            case "incorrect":
                return "getAnswer";
            case "correct":
            case "showCorrect":
                return "newProblem";
        }
    }

    const buttonRef = () => {
        switch (problem.status) {
            case "correct":
            case "showCorrect":
                return newProbBtnRef;
            default:
                return null;
        }
    }

    const handleButtonClick = () => {
        switch (problem.status) {
            case null:
            case "incorrect":
                return getCorrectAnswer;
            case "correct":
            case "showCorrect":
                return getProblem;
        }
    }

    // const renderButtons = () => {
    //     switch (problem.status) {
    //         case null:
    //             return <Button role="getAnswer" handleClick={getCorrectAnswer} />
    //         case "incorrect":
    //             return (<>
    //                 <Button role="getAnswer" handleClick={getCorrectAnswer} />
    //                 <Button role="tryAgain" refToAccess={tryAgainBtnRef} handleClick={handleTryAgain} />
    //             </>)
    //         case "correct":
    //             return <Button role="newProblem" refToAccess={newProbBtnRef} handleClick={getProblem} />
    //         case "showCorrect":
    //             return <Button role="newProblem" refToAccess={newProbBtnRef} handleClick={getProblem} />
    //     }
    // }

    return (
        <div className="Problem">
            <div className="Problem-main">
                <Expression latex={problem.latex} />

                {problem.status===null ?
                    <UserInputForm submitUserAnswer={submitUserAnswer} inputFieldRef={inputFieldRef}/> 
                    :
                    <Message />
                }
            </div>
            <div className="Problem-buttons">
                <Button role={buttonRole()} refToAccess={buttonRef()} handleClick={handleButtonClick()} />
                                                       
                {problem.status === 'incorrect' ? 
                    <Button role="tryAgain" refToAccess={tryAgainBtnRef} handleClick={handleTryAgain} />
                    : null
                }
            </div>
        </div>
    )
}

export default Problem;