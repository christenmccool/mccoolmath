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
        "check" : "Button-btn Button-btn-check",
        "newProblem" : "Button-btn Button-btn-other",
        "getAnswer" : "Button-btn Button-btn-other",
        "tryAgain" : "Button-btn Button-btn-other"
    }

    return (
        <div className="Button">
            <button className={buttonClass[role]} onClick={handleClick} ref={refToAccess}>
                {buttonText[role]}
            </button>
        </div>
    )
}

export default Button;