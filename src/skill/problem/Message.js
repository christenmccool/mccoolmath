import React from 'react';
import Expression from './Expression';
import './Message.css'

/** Message component for after user submits answer or requests correct answer 
 * Either displays uswer answer or correct answer
 * If user submitted their answer, displays status (correct or incorrect)
*/
const Message = ({ problem, isGraphing }) => {

    //user or correct answer to display in math field
    const latexToDisplay = () => {
        if (problem.status==='showCorrect') {
            return problem.correctAnswer.toString();
        }
        return problem.userAnswer;
    }

    const messageText = () => {
        switch (problem.status) {
            case "correct": return "Correct"
            case "incorrect": return "Incorrect"
            default: return null;
        }
    }

    return (
        <div className="Message">
            {!(isGraphing && problem.args.type==="graph") ?
                <Expression latex={latexToDisplay()} />
                : null
            }
            
            <h1 className={`Message-text Message-text-${problem.status}`}>{messageText()}</h1> 
        </div>
    )
}

export default Message;