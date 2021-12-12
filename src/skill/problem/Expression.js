import React from 'react';
import { addStyles, StaticMathField } from 'react-mathquill';
import './Expression.css'

// Displays the math expression for each problem given the latex expression
const Expression = ( {latex, isGraphing } ) => {
    if (latex === null) return null;

    const componentClass = isGraphing ? `-graphing` : "";
    // Inserts required CSS for MathQuill
    addStyles();
    
    return (
        <div className={`Expression${componentClass}`}>
            <StaticMathField>
                {latex}
            </StaticMathField>
        </div>
    )
}

export default Expression;