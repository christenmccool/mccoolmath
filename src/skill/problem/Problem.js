import React, {useEffect, useRef} from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Expression from './Expression';
import UserInputForm from './UserInputForm';
import Message from './Message';
import Button from '../Button';
import './Problem.css';

const API_BASE_URL = "https://mccoolmath.herokuapp.com"

/** Problem component for McCool Math app 
*/
const Problem = ({ problem, setProblem, setScore }) => {
    const {skill} = useParams();
    const [searchParams] = useSearchParams();
    const searchParamsStr = searchParams.toString();

    const API_URL = `${API_BASE_URL}/${skill}`;
    let navigate = useNavigate();

    const newProbBtnRef = useRef();
    const tryAgainBtnRef = useRef();
    const inputFieldRef = useRef();

    useEffect(() => {
        if (searchParamsStr==="") return;
        const url = `${API_URL}?${searchParamsStr}`;
        axios.get(url)
        .then(resp => setProblem({...resp.data, 
                        userAnswer: null,
                        correctAnswer: null, 
                        status: null,
                        previousUserAnswers: []
        }))
        .catch(err => {
            console.log(err);
            navigate("/");
        });
    }, [searchParams]);

    useEffect(() => {
        if (problem.latex) return;
        const url = `${API_URL}?${searchParamsStr}`;
        axios.get(url)
        .then(resp => setProblem({...problem, ...resp.data}))
        .catch(err => {
            console.log(err);
            navigate("/");
        });
    }, [problem.status]);

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
        setProblem({
            latex: null, 
            problemType: null, 
            args: null,
            userAnswer: null,
            correctAnswer: null, 
            status: null,
            previousUserAnswers: []
        });
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

    const renderButtons = () => {
        switch (problem.status) {
            case null:
                return <Button text="Show Answer" type="other" handleClick={getCorrectAnswer} />
            case "incorrect":
                return (<>
                    <Button text="Show Answer" type="other" handleClick={getCorrectAnswer} />
                    <Button text="Try Again" type="other" refToAccess={tryAgainBtnRef} handleClick={handleTryAgain} />
                </>)
            case "correct":
                return <Button text="Next" type="other" refToAccess={newProbBtnRef} handleClick={getProblem} />
            case "showCorrect":
                return <Button text="Next" type="other" refToAccess={newProbBtnRef} handleClick={getProblem} />
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
                {renderButtons()}
            </div>
        </div>
    )
}

export default Problem;