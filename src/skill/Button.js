import React from 'react';
import './Button.css'

// Button component reused throughout McCool Math app
const Button = ( {  text, type='other', handleClick=null, formId=null, refToAccess=null } ) => {

    const buttonClass = () => {
        switch (type) {
            case "check": return "Button-btn-check";
            case "start": return "Button-btn-start";
            case "reset": return "Button-btn-reset";
            case "other": return "Button-btn-other";
            default: return "Button-btn-other";
        }
    }

    if (formId) {
        return (
            <div className="Button">
                <button className={`Button-btn ${buttonClass()}`} ref={refToAccess} form={formId} type="submit">
                    {text}
                </button>
            </div>
        )  
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

