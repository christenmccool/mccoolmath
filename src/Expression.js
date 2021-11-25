import React from 'react';
import { addStyles, StaticMathField } from 'react-mathquill';
import './Expression.css'

const Expression = ( {latex} ) => {

    // Inserts required CSS for MathQuill
    addStyles();
    
    return (
        <div className="Expression">
            <StaticMathField>
                {latex}
            </StaticMathField>
        </div>
    )
}

export default Expression;