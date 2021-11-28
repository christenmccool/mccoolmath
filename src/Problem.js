import React, {useEffect, useRef} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Expression from './Expression';
import UserInputForm from './UserInputForm';
import Message from './Message';
import Button from './Button';
import './Problem.css';

const API_BASE_URL = "http://localhost:3000";

const Problem = ({ option, INITIAL_STATE, problem, setProblem, setScore }) => {
    const {skill} = useParams();

    const API_URL = `${API_BASE_URL}/${skill}`;
    let navigate = useNavigate();

    const newProbBtnRef = useRef();
    const tryAgainBtnRef = useRef();
    const inputFieldRef = useRef();

    useEffect(()=> {
        setProblem(INITIAL_STATE);
    }, [option])

    useEffect(() => {
        if (problem.latex) return;
        const url = option ? `${API_URL}?${option.param}=${option.value}` : API_URL;
        axios.get(url)
        .then(resp => setProblem({...problem, ...resp.data}))
        .catch(err => {
            console.log(err);
            navigate("/");
        });
    }, [option, problem, API_URL, navigate]);

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
    }

    const submitUserAnswer = (userAnswer) => {
        axios.post(API_URL, {   
            problemType: problem.problemType,
            args: problem.args,
            answer: userAnswer,
        })
        .then(resp => {
            setProblem({...problem, 
                ...resp.data, 
                userAnswer,
                previousUserAnswers:[...problem.previousUserAnswers, userAnswer]
            });
            const correct = resp.data.status === 'correct' ? 1 : 0;
            setScore(score => ({correct: score.correct + correct, attempts: score.attempts + 1}));
        })
        .catch(err => console.log(err));
    }

    const getCorrectAnswer = () => {
        axios.post(API_URL, {   
            problemType: problem.problemType,
            args: problem.args,
            answer: null,
            returnAnswer: true
        })
        .then(resp => {
            setProblem({...problem, 
                ...resp.data, 
                userAnswer: null, 
                status: 'showCorrect'
            });
            setScore(score => ({correct: score.correct, attempts: score.attempts + 1}));
        })
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
            default: 
                return null
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
            default: 
                return null
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