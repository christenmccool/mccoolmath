import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Expression from './Expression.js';
import UserInputForm from './UserInputForm.js';
import Message from './Message.js';
import Button from './Button.js';
import './Problem.css';

const BASE_URL = "http://localhost:3000/integerop/";

const Problem = () => {

    const INITIAL_STATE = {
        latex: null, 
        problemType: null, 
        args: null,
        userAnswer: null,
        correctAnswer: null, 
        status: null,
        previousUserAnswers: []
    }

    const [problem, setProblem] = useState(INITIAL_STATE);

    const newProbBtnRef = useRef();
    const tryAgainBtnRef = useRef();
    const inputFieldRef = useRef();

    useEffect(() => {
        if (problem.latex) return;
        axios.get(BASE_URL)
        .then(resp => setProblem({...problem, ...resp.data}))
        .catch(err => console.log(err));
    }, [problem]);

    useEffect(() => {
        if (!problem.status) {
            inputFieldRef.current.children[0].children[0].children[0].focus();
        } else if (problem.status === 'incorrect') {
            tryAgainBtnRef.current.focus();
        } else if (problem.status === 'correct' || problem.status === 'showCorrect') {
            newProbBtnRef.current.focus();
        }
    }, [problem.status])

    const getProblem = () => {
        setProblem(INITIAL_STATE);
        // axios.get(BASE_URL)
        // .then(resp => setProblem(resp.data))
        // .catch(err => console.log(err));
    }

    const submitUserAnswer = (userAnswer) => {
        axios.post(BASE_URL, {   
            probType: problem.problemType,
            args: problem.args,
            answer: userAnswer,
        })
        .then(resp => setProblem(
            {...problem, 
                ...resp.data, 
                userAnswer,
                previousUserAnswers:[...problem.previousUserAnswers, userAnswer]
            }
        ))
        .catch(err => console.log(err));
    }

    const getCorrectAnswer = () => {
        axios.post(BASE_URL, {   
            probType: problem.problemType,
            args: problem.args,
            answer: null,
            returnAnswer: true
        })
        .then(resp => setProblem(
            {...problem, 
                ...resp.data, 
                userAnswer: null, 
                status: 'showCorrect'
            }
        ))
        .catch(err => console.log(err));
    }

    const handleTryAgain = () => {
        setProblem({...problem, 
            status: null,
            userAnswer: null        
        });
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

    return (
        <div className="Problem">
            <div className="Problem-main">
                <Expression latex={problem.latex} />

                {problem.status===null ?
                    <UserInputForm submitUserAnswer={submitUserAnswer} inputFieldRef={inputFieldRef}/> 
                    :
                    <Message problem={problem}/>
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