import React from 'react';
// import { useSelector } from 'react-redux';
import Expression from './Expression';
import './Message.css'

const Message = ({ problem }) => {
    // const problem = useSelector(state => state.problem);

    const latexToDisplay = () => {
        if (problem.status==='showCorrect') {
            return problem.correctAnswer;
        }
        return problem.userAnswer;
    }

    const messageText = () => {
        return problem.status==='correct' ? "Correct!" : "Incorrect";
    }

    return (
        <div className="Message">
            <Expression latex={latexToDisplay()} />
            {problem.status!=='showCorrect' ? 
                <h1 className={`Message-text Message-text-${problem.status}`}>{messageText()}</h1> : null
            }
        </div>
    )
}

export default Message;