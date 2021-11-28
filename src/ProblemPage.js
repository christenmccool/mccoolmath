import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Options from './Options';
import Problem from './Problem';
import FiveSecCount from './FiveSecCount';
import Score from './Score';
import Timer from './Timer';
import './ProblemPage.css';

const ProblemPage = () => {

    const {skill} = useParams();

    const INITIAL_STATE = {
        latex: null, 
        problemType: null, 
        args: null,
        userAnswer: null,
        correctAnswer: null, 
        status: null,
        previousUserAnswers: []
    }
    const options = () => {
        switch (skill) {
            case "integers":
                // return {choices: [
                //             {choice:'add', text:'Add', params: ['type=add']},
                //             {choice:'sub', text:'Subtract', params: ['type=sub']},
                //             {choice:'mult', text:'Multiply', params: ['type=mult']},
                //             {choice:'div', text:'Divide', params: ['type=div']},
                //             {choice:'all', text:'All', params: ['type=all']}
                // ], default:'all'}
                return {param: "type",
                        choices: {'add': 'Add', 'sub': 'Subtract', 'mult': 'Multiply', 'div': 'Divide', 'all': 'All'}, 
                        default:'all'}
            case "orderofops":
                return {param: "n", choices: {'3': 'Easy', '4':'Medium', '5':'Hard'}, default: '3'};
            default: 
                return null
        }
    }
    const [problem, setProblem] = useState(INITIAL_STATE);
    const [score, setScore] = useState({correct: 0, attempts: 0});
    const [time, setTime] = useState(0);
    const [runTimer, setRunTimer] = useState(false);
    const [option, setOption] = useState({param: options().param, value: options().default});

    const countdownTime = () => {
        return 5 - Math.round(time / 1000);
    }

    return (
        <div className="ProblemPage">
            <div className="ProblemPage-main">
                <Options 
                    options={options()}
                    option={option}
                    setOption={setOption}
                />
                <Problem 
                    option={option}
                    INITIAL_STATE={INITIAL_STATE}
                    problem={problem}
                    setProblem={setProblem}
                    setScore={setScore} 
                />
                {runTimer && time < 6000 ?
                    <div className="ProblemPage-countdown">
                        <FiveSecCount
                            time={countdownTime()}
                        />
                    </div>
                : null}
            </div>
            <div className="ProblemPage-info">
                <div className="ProblemPage-scores">
                    <Score score={score} />
                </div>
                <div className="ProblemPage-timer">
                    <Timer 
                        time={time}
                        setTime={setTime}
                        runTimer={runTimer}
                        setRunTimer={setRunTimer}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProblemPage;