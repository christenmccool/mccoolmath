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
 * Retrieves problemm atching skill name and optional query string from McCool Math API 
 * Display math latex expression from API and user input form for submitting answer
 * Displays message after submitting answer or requesting correct answer 
 * 
 * If visible is false, problem is not displayed
 * This prevents the componet from needing to unmount
*/
const Problem = ({ visible, problem, setProblem, setScore }) => {
    const {skill} = useParams();
    const [searchParams] = useSearchParams();
    const searchParamsStr = searchParams.toString();
    let navigate = useNavigate();

    const API_URL = `${API_BASE_URL}/${skill}`;
    const hideClass = !visible ? "-hide" : "";

    const newProbBtnRef = useRef();
    const tryAgainBtnRef = useRef();
    const inputFieldRef = useRef();

    //Include query string in API call if given
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

    //Get new problem from API if latex is null
    useEffect(() => {
        if (problem.latex) return;
        const url = `${API_URL}?${searchParamsStr}`;
        axios.get(url)
        .then(resp => setProblem({...problem, ...resp.data}))
        .catch(err => {
            console.log(err);
            navigate("/");
        });
    }, [problem.latex]);

    //Set focus on desired button
    useEffect(() => {
        if (!visible) return;
        if (!problem.status) {
            inputFieldRef.current.children[0].children[0].children[0].focus();
        } else if (problem.status === 'incorrect') {
            tryAgainBtnRef.current.focus();
        } else if (problem.status === 'correct' || problem.status === 'showCorrect') {
            newProbBtnRef.current.focus();
        }
    }, [visible, problem.status])

    //Reset problem on new problem request
    //Latex to null triggers call to API for new problem
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

    //Post user answer to API
    //API returns status (correct or incorrect) as response
    //Update score based on status
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

    //Post request for correct answer to API
    //API returns correct answer
    //Incrememnt score attempts by 1
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

    //Set status and user answer to null when trying again on the same problem
    //Will not trigger call to API
    const handleTryAgain = () => {
        setProblem({...problem, 
            status: null,
            userAnswer: null        
        });
    }

    //Determine button propss based on problem status
    const buttonProps = () => {
        if (!problem.status || problem.status === "incorrect") { 
            return ({text: "Show Answer", onClick: getCorrectAnswer})
        } else if (problem.status === "correct" || problem.status === "showCorrect") {
            return ({text: "Next", onClick: getProblem, ref: newProbBtnRef})
        }
    }

    // //Display placeholder so component isn't unmounted
    // if (!visible) {
    //     return (
    //         <div className="Problem"></div>
    //     )
    // }

    return (
        <div className="Problem">
            <div className={`Problem-main${hideClass}`}>
                <Expression latex={problem.latex} />

                {problem.status===null ?
                    <UserInputForm submitUserAnswer={submitUserAnswer} inputFieldRef={inputFieldRef}/> 
                    :
                    <Message problem={problem}/>
                }
            </div>
            <div className={`Problem-buttons${hideClass}`}>
                <Button text={buttonProps().text} refToAccess={buttonProps().ref} handleClick={buttonProps().onClick} />

                {problem.status === 'incorrect' ? 
                    <Button text="Try Again" refToAccess={tryAgainBtnRef} handleClick={handleTryAgain} />
                : null}
            </div>
        </div>
    )
}

export default Problem;