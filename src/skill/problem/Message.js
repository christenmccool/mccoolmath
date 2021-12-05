import React from 'react';
import Expression from './Expression';
import './Message.css'

/** Message component for after user submits answer or requests correct answer 
 * Either displays uswer answer or correct answer
 * If user submitted their answer, displays status (correct or incorrect)
*/
const Message = ({ problem }) => {

    //user or correct answer to display in math field
    const latexToDisplay = () => {
        if (problem.status==='showCorrect') {
            return problem.correctAnswer.toString();
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