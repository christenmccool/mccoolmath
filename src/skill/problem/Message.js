import React from 'react';
import confetti from '../../images/confetti.gif';
import './Message.css'

// Message component displays status (correct or incorrect)
// Formatting dependent on if graphing problem or not
const Message = ({ problem, isGraphing=false }) => {
    const confettiClass = problem.status === 'correct' ? "Message-confetti" : "Message-no-confetti";
    const componentClass = isGraphing ? `-graphing` : "";

    const messageText = () => {
        switch (problem.status) {
            case "correct": return "Correct"
            case "incorrect": return "Try Again"
            default: return null;
        }
    }

    return (
        <div className={`Message`}>
            <img className={`${confettiClass}${componentClass}`} src={confetti} alt="confetti" />
            <h1 className={`Message-text Message-text-${problem.status}${componentClass}`}>{messageText()}</h1> 
        </div>
    )
}

export default Message;