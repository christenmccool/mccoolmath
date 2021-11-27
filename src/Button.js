import React from 'react';
import './Button.css'

const Button = ( {role, handleClick=null, refToAccess=null} ) => {
    const buttonText = {
        "check" : "Check",
        "newProblem" : "Next",
        "getAnswer" : "Show Answer", 
        "tryAgain" : "Try Again"
    }
    const buttonClass = {
        "check" : "check",
        "newProblem" : "other",
        "getAnswer" : "other",
        "tryAgain" : "other"
    }

    return (
        <div className="Button">
            <button className={`Button-btn Button-btn-${buttonClass[role]}`} onClick={handleClick} ref={refToAccess}>
                {buttonText[role]}
            </button>
        </div>
    )
}

export default Button;