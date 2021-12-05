import React from 'react';
import './Button.css'

// Button component reused throughout McCool Math app
const Button = ( {  text, type='other', handleClick=null, refToAccess=null } ) => {

    const buttonClass = () => {
        switch (type) {
            case "check": return "Button-btn-check";
            case "start": return "Button-btn-start";
            case "other": return "Button-btn-other";
            default: return "Button-btn-other";
        }
    }

    return (
        <div className="Button">
            <button className={`Button-btn ${buttonClass()}`} onClick={handleClick} ref={refToAccess}>
                {text}
            </button>
        </div>
    )
}

export default Button;

