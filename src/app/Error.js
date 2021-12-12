import React from 'react';
import './Error.css'

//Page to display for invalid URL path
const Error = () => {
    return (
        <div className="Error">
            <div>
                Server Error.
            </div>
            <div>
                Please try again later.
            </div>
        </div>
    )
}

export default Error;