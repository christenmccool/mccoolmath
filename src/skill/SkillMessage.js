import React from 'react';
import './SkillMessage.css'

const SkillMessage = ({ text }) => {

    if (!text) return null;

    return (
        <div className="SkillMessage">
            <div className="SkillMessage-text">
                {text}
            </div>
        </div>
    )
}

export default SkillMessage;