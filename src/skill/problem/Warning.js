import React from 'react';
import './Warning.css'

//Warning compoent displays text
const Warning = ({ text }) => {
    return (
        <div className="Warning">
            {text}
        </div>
    )
}

export default Warning;