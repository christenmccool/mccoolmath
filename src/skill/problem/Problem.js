import React, {useState, useEffect, useRef} from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ExpressionBlock from './ExpressionBlock';
import Expression from './Expression';
import Graph from './graph/Graph';
import UserInputField from './UserInputField';
import Overlay from './Overlay';
import Message from './Message';
import Warning from './Warning';
import Button from '../Button';
import opts from '../../app/opts';

import './Problem.css';

const API_BASE_URL = "https://mccoolmath.herokuapp.com"
// const API_BASE_URL = 'http://localhost:3000';

/** Problem component for McCool Math app 
 * Retrieves problem matching skill name and optional query string from McCool Math API 
 * Display math latex expression from API and user input form for submitting answer
 * Displays interactive graph for graphing problems
 * Displays message after submitting answer or requesting correct answer 
 * 
 * If visible is false, problem is not displayed
 * This prevents the componet from needing to unmount
*/
const Problem = ({ visible, option, problem, setProblem, setScore }) => {

    const {skill} = useParams();
    const [searchParams] = useSearchParams();
    const [showOverlay, setShowOverlay] = useState(false);
    const [calculator, setCalculator] = useState(null);
    const [warning, setWarning] = useState(null);
    let navigate = useNavigate();

    const isGraphing = opts[skill].graphing;
    const hideClass = !visible ? "-hide" : "";
    const componentClass = isGraphing ? `-graphing` : "";
    const API_URL = `${API_BASE_URL}/${skill}`;

    const newProbBtnRef = useRef();
    const tryAgainBtnRef = useRef();
    const inputFieldRef = useRef();
    const checkBtnRef = useRef();

    //Get new problem from API when problem.args is null or the query string changes
    //Return if query string isn't valid
    useEffect(() => {
        if (problem.args) return;

        let opt = opts[skill].options.find(ele => ele.paramStr === searchParams.toString());        
        if (!opt) return;

        getProblem();
    }, [problem.args, searchParams])


    //Set focus on desired button or input field
    useEffect(() => {
        if (!visible) return;

        if (!problem.status && !(isGraphing && problem.latex)) {
            inputFieldRef.current.children[0].children[0].children[0].focus();
        } else if (!problem.status && isGraphing && problem.latex) {
            checkBtnRef.current.focus();
        } else if (problem.status === 'incorrect') {
            tryAgainBtnRef.current.focus();
        } else if (problem.status === 'correct' || problem.status === 'showCorrect') {
            newProbBtnRef.current.focus();
        }
    }, [visible, problem.status, problem.args, showOverlay])

    //Hide overlay 
    useEffect(() => {
        if (problem.status === null || problem.status === 'showCorrect') {
            setShowOverlay(false);
        }
    },[problem.status])

    //Get new problem from API
    //Resets problem state with data from API call
    const getProblem = () => {
        const url = `${API_URL}?${searchParams.toString()}`;

        axios.get(url)
        .then(resp => {
            setProblem({...resp.data, 
                userAnswer: null,
                correctAnswer: null, 
                status: null,
                work: null,
                previousUserAnswers: []
            })
        })
        .catch(err => {    
            console.log(err);
            navigate("/error");
        });
    }

    //Post user answer to API
    //API returns status (correct or incorrect) as response
    //Update score based on status
    const submitUserAnswer = (userAnswer) => {
        axios.post(API_URL, {   
            args: problem.args,
            answer: userAnswer,
            returnAnswer: 'ifCorrect'        
        })
        .then(resp => {
            setProblem({...problem, 
                ...resp.data, 
                userAnswer,
                previousUserAnswers:[...problem.previousUserAnswers, userAnswer]
            });

            if (resp.data.status === 'correct') {
                const correct = resp.data.status === 'correct' ? 1 : 0;
                setScore(score => ({correct: score.correct + correct, attempts: score.attempts + 1}));
            }
        })
        .catch(err => console.log(err));

        setShowOverlay(true);
    }

    //Post user answer to API when in the form of points stored in the calculator's userTable
    //API returns status (correct or incorrect) as response
    //Update score based on status
    const submitUserPoints = () => {
        const userTable = calculator.getExpressions().find(obj => obj['id'] === 'userTable');

        if (userTable.columns[0].values.length < 3) {
            setWarning("Plot at least 3 points.")
            return;
        } else {
            setWarning(null);
        }
        const userPoints  = [userTable.columns[0].values, userTable.columns[1].values];

        axios.post(API_URL, {   
            args: problem.args,
            answer: userPoints,
            returnAnswer: 'ifCorrect'        
        })
        .then(resp => {
            setProblem({...problem, 
                ...resp.data, 
                userAnswer: userPoints,
                previousUserAnswers:[...problem.previousUserAnswers, userPoints]
            });

            if (resp.data.status === 'correct') {
                const correct = resp.data.status === 'correct' ? 1 : 0;
                setScore(score => ({correct: score.correct + correct, attempts: score.attempts + 1}));
            }
        })
        .catch(err => console.log(err));

        setShowOverlay(true);
    }

    //Post request for correct answer to API
    //API returns correct answer
    //Incrememnt score attempts by 1
    const getCorrectAnswer = () => {
        axios.post(API_URL, {   
            args: problem.args,
            answer: null,
            returnAnswer: 'always'
        })
        .then(resp => {
            setProblem({...problem, 
                ...resp.data, 
                userAnswer: null, 
            });

            setScore(score => ({correct: score.correct, attempts: score.attempts + 1}));
        })
        .catch(err => {
            console.log(err);
            navigate("/error");
        });
        setWarning(null);
    }

    //Set status and user answer to null when trying again on the same problem
    const handleTryAgain = () => {
        setProblem({...problem, 
            status: null,
            userAnswer: null        
        });
    }

    //user or correct answer to display in math field
    const answerToDisplay = () => {
        if (isGraphing && problem.latex) return null;
        if (problem.status==='showCorrect') {
            return problem.correctAnswer.toString();
        }
        return problem.userAnswer;
    }


    //Determine button propss based on problem status
    const buttonProps = () => {
        if (!problem.status || problem.status === "incorrect") { 
            return ({text: "Skip", onClick: getCorrectAnswer})
        } else if (problem.status === "correct" || problem.status === "showCorrect") {
            return ({text: "Next", onClick: getProblem, ref: newProbBtnRef})
        }
    }

    return (
        <div className={`Problem${componentClass}`} style={{height: option.styles.height}}>

            <div className={`Problem-main${hideClass}`}>

                <Expression 
                    latex={problem.latex} 
                    fontSize={option.styles.problemFont}
                />

                {isGraphing ? 
                    <div className="Problem-graph">
                        <Graph 
                            calculator={calculator} 
                            setCalculator={setCalculator} 
                            setWarning={setWarning}
                            problem={problem}
                            checkBtnRef={checkBtnRef}
                        />
                        {showOverlay ?
                            <Overlay 
                                div={<Message problem={problem} isGraphing={true} />} 
                                setShowOverlay={setShowOverlay}
                            />
                            : 
                            null
                        }
                    </div>
                    : 
                    null
                }

                {problem.status === null ?
                    <>
                        {!(isGraphing && problem.latex) ? 
                            <UserInputField 
                                submitUserAnswer={submitUserAnswer} 
                                inputFieldRef={inputFieldRef} 
                                isGraphing={isGraphing}
                                setWarning={setWarning}
                            /> 
                            :
                            null   
                        }
                    </>
                    :
                    <>
                        <ExpressionBlock 
                            latexArr={problem.work} 
                            fontSize={option.styles.workFont}
                            color="grey"
                        />
                        <Expression 
                            latex={answerToDisplay()} 
                            fontSize={option.answerFont}
                        />

                        {!isGraphing ?
                            <Message problem={problem} />
                        : null}
                    </>
                }

                <Warning text={warning} />

            </div>
            <div className={`Problem-buttons${hideClass}`}>
                {problem.status === null ?
                    <>
                    {!(isGraphing && problem.latex) ?
                        <Button text="Check" type="check" formId="check-answer-form" refToAccess={checkBtnRef} />
                        :
                        <Button text="Check" type="check" refToAccess={checkBtnRef} handleClick={submitUserPoints} />
                    }
                    </>
                : null}

                <Button text={buttonProps().text} refToAccess={buttonProps().ref} handleClick={buttonProps().onClick} />

                {problem.status === 'incorrect' ? 
                    <Button text="Try Again" refToAccess={tryAgainBtnRef} handleClick={handleTryAgain} />
                : null}
            </div>
        </div>
    )
}

export default Problem;