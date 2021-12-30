import React from 'react';
import { useParams } from 'react-router-dom';
import { addStyles, StaticMathField } from 'react-mathquill';
import './Expression.css'

// Displays the math expression for each problem given the latex expression
// Font size determined based on problem type and length of latex string
const Expression = ( {latex, fontSize="m", color="black"} ) => {
    const {skill} = useParams();

    if (latex === null) return null;

    // Inserts required CSS for MathQuill
    addStyles();
    
    return (
        <div className={`Expression Expression-text-${fontSize}`} style={{color}}>
            <StaticMathField>
                {latex}
            </StaticMathField>
        </div>
    )
}

export default Expression;
