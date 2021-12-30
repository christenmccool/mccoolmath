import React from 'react';
import Expression from './Expression';
import { addStyles, StaticMathField } from 'react-mathquill';

// Displays the math expression for each problem given the latex expression
// Font size determined based on problem type and length of latex string
const ExpressionBlock = ( {latexArr, fontSize="s", color} ) => {
    if (latexArr === null) return null;

    // Inserts required CSS for MathQuill
    addStyles();
    
    return (
        <>
            {latexArr.map(ele => 
                <Expression 
                    latex={ele} 
                    fontSize={fontSize}
                    color={color} 
                />
            )}
        </>
    )
}

export default ExpressionBlock;