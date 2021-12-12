import React, {useState, useEffect, useRef} from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Graph from './graph/Graph';
import Expression from './Expression';
import UserInputForm from './UserInputForm';
import Message from './Message';
import Button from '../Button';
import confetti from '../confetti.gif';

import {solutionTableDef, userTableDef, lineDef} from './graph/calcDef';
import './GraphingProblem.css';

// const API_BASE_URL = "https://mccoolmath.herokuapp.com"
const API_BASE_URL = 'http://localhost:3000';

/** Problem component for McCool Math app 
 * Retrieves problem matching skill name and optional query string from McCool Math API 
 * Display math latex expression from API and user input form for submitting answer
 * Displays message after submitting answer or requesting correct answer 
 * 
 * If visible is false, problem is not displayed
 * This prevents the componet from needing to unmount
*/
const GraphingProblem = ({ visible, isGraphing, option, problem, setProblem, setScore }) => {
    const {skill} = useParams();
    const [searchParams] = useSearchParams();
    const searchParamsStr = searchParams.toString();
    let navigate = useNavigate();

    const API_URL = `${API_BASE_URL}/${skill}`;
    const hideClass = !visible ? "-hide" : "";
    const confettiClass = problem.status === 'correct' ? "Problem-confetti" : "Problem-no-confetti";
    const componentClass = isGraphing ? `-graphing` : "";

    const newProbBtnRef = useRef();
    const tryAgainBtnRef = useRef();
    const inputFieldRef = useRef();

    const [calculator, setCalculator] = useState(null);
    const [warning, setWarning] = useState(null);

    //Get new problem from API if option changes for problem-type
    //Return without calling API if the search parameter string hasn't been set yet
    useEffect(() => {
        if (!searchParamsStr) return;
        getProblem();
    }, [option]);

    //Get new problem from API if problem.args is null
    //Return without calling API if it is a graphing problem but the calculator hasn't been set yet
    useEffect(() => {
        if (problem.args || (isGraphing && !calculator)) return;
        getProblem();
    }, [problem.args, calculator]);

    //Set focus on desired button or input field
    useEffect(() => {
        if (!visible) return;

        if (!problem.status && !(isGraphing && problem.latex)) {
            inputFieldRef.current.children[0].children[0].children[0].focus();
        } else if (problem.status === 'incorrect') {
            tryAgainBtnRef.current.focus();
        } else if (problem.status === 'correct' || problem.status === 'showCorrect') {
            newProbBtnRef.current.focus();
        }
    }, [visible, problem.status, problem.args])

    //Get new problem from API
    //Resets problem object as well as calculator object
    const getProblem = () => {

        if (calculator) {
            calculator.setExpression({...solutionTableDef});
            calculator.setExpression({...userTableDef});
            calculator.setExpression({...lineDef});
        }
        setWarning(null);

        const apiParamsStr = option && option.apiParamsStr ? `?${option.apiParamsStr}` : "";
        const url = `${API_URL}${apiParamsStr}`;

        axios.get(url)
        .then(resp => {
            setProblem({...resp.data, 
                userAnswer: null,
                correctAnswer: null, 
                status: null,
                previousUserAnswers: []
            })

            //For an equation graphing problem, graph line using points obtained from API
            //Set solution points but do not display them
            if (calculator && resp.data.args.type === 'equation') {
                const xCoords = resp.data.args.points[0];
                const yCoords = resp.data.args.points[1];
                setSolutionTable(xCoords, yCoords, true);

                const m = (yCoords[1] - yCoords[0])/(xCoords[1] - xCoords[0]);
                const b = yCoords[0] - m * xCoords[0];
                calculator.setExpression({id:'line', latex: `${m}x+${b}`});
            }
        })
        .catch(err => {
            console.log(err);
            navigate("/error");
        });
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

            //For a graphing problem of type graph, graph points and line obtained from API
            if (isGraphing && problem.args.type === "graph") {
                const xCoords = resp.data.correctAnswer[0];
                const yCoords = resp.data.correctAnswer[1];
                setSolutionTable(xCoords, yCoords, false);
                calculator.setExpression({id:'line', latex: problem.latex});
            }
            //For a graphing problem of type equation, display points on line
            if (isGraphing && problem.args.type ==="equation") {
                const solutionTable = calculator.getExpressions().find(obj => obj['id'] === 'solutionTable');
                solutionTable.columns[1].hidden = false;
                calculator.setExpression(solutionTable);
            }
            setScore(score => ({correct: score.correct, attempts: score.attempts + 1}));
        })
        .catch(err => {
            console.log(err);
            navigate("/error");
        });
    }

    //Set solution table to include given array of x coordinates and array for y coordinates
    const setSolutionTable = (xCoords, yCoords, hidden) => {
        const solutionTableCopy = {...solutionTableDef};
        const solutionTableColXCopy = {...solutionTableDef.columns[0]};
        const solutionTableColYCopy = {...solutionTableDef.columns[1]};
    
        solutionTableColXCopy.values =  xCoords;
        solutionTableColYCopy.values =  yCoords;
        solutionTableColYCopy.hidden =  hidden;
        solutionTableCopy.columns = [solutionTableColXCopy, solutionTableColYCopy];
        calculator.setExpression(solutionTableCopy);
    }

    //Post user answer to API
    //API returns status (correct or incorrect) as response
    //Update score based on status
    const submitUserAnswer = (userAnswer=null) => {
        let userPoints;
        if (isGraphing && problem.args.type === "graph") {
            const userTable = calculator.getExpressions().find(obj => obj['id'] === 'userTable');

            if (userTable.columns[0].values.length < 3) {
                setWarning("Plot at least 3 points.")
                return;
            } else {
                setWarning(null);
            }
            userPoints  = [userTable.columns[0].values, userTable.columns[1].values];
        }

        const answer = userPoints || userAnswer;

        axios.post(API_URL, {   
            problemType: problem.problemType,
            args: problem.args,
            answer,
            returnAnswer: true
        })
        .then(resp => {
            setProblem({...problem, 
                ...resp.data, 
                answer,
                previousUserAnswers:[...problem.previousUserAnswers, answer]
            });

            if (resp.data.status === 'correct') {
                //For a graphing problem of type graph, graph points and line obtained from API
                if (isGraphing && problem.args.type === "graph") {
                    const xCoords = resp.data.correctAnswer[0];
                    const yCoords = resp.data.correctAnswer[1];
                    setSolutionTable(xCoords, yCoords, false);
                    calculator.setExpression({id:'line', latex: problem.latex});
                }

                const correct = resp.data.status === 'correct' ? 1 : 0;
                setScore(score => ({correct: score.correct + correct, attempts: score.attempts + 1}));
            }
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
        if (calculator) {
            calculator.setExpression({...userTableDef});
        }
    }

    //Determine button propss based on problem status
    const buttonProps = () => {
        if (!problem.status || problem.status === "incorrect") { 
            return ({text: "Show Answer", onClick: getCorrectAnswer})
        } else if (problem.status === "correct" || problem.status === "showCorrect") {
            return ({text: "Next", onClick: getProblem, ref: newProbBtnRef})
        }
    }

    return (
        <div className={`Problem Problem${componentClass}`}>

            <div className={`Problem-main${componentClass} Problem-main${hideClass}`}>
                <img className={confettiClass} src={confetti} alt="confetti" />
               
                <Expression latex={problem.latex} isGraphing={isGraphing}/>

                {isGraphing ? 
                    <Graph calculator={calculator} setCalculator={setCalculator} />
                    : 
                    null
                }

                {problem.status === null ?
                    <>
                        {isGraphing && problem.latex ? 
                            <Button text="Check" type="check" handleClick={submitUserAnswer}/>
                            :
                            <UserInputForm submitUserAnswer={submitUserAnswer} inputFieldRef={inputFieldRef} isGraphing={isGraphing}/>    
                        }
                    </>
                    :
                    <>
                        <img className={confettiClass} src={confetti} alt="confetti" />
                        <Message problem={problem} isGraphing={isGraphing}/>
                    </>
                }

                <div className="Problem-warning">
                    {warning}
                </div>
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

export default GraphingProblem;