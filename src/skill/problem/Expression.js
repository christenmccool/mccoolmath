import React from 'react';
import { useParams } from 'react-router-dom';
import { addStyles, StaticMathField } from 'react-mathquill';
import './Expression.css'

// Displays the math expression for each problem given the latex expression
// Font size determined based on problem type and length of latex string
const Expression = ( {latex } ) => {
    const {skill} = useParams();

    if (latex === null) return null;
    const latexLen = latex.length;

    const fontClass = () => {

        if (skill === 'lineareqn') return '-m-fixed';
        
        if (skill === 'orderofops') {
            if (latexLen > 18 ) return '-xs';
            if (latexLen > 13 ) return '-s';
            if (latexLen > 3 ) return '-m';
            return '-l';
        }
        return '-l';
    }

    // Inserts required CSS for MathQuill
    addStyles();
    
    return (
        <div className={`Expression Expression-text${fontClass()}`} >
            <StaticMathField>
                {latex}
            </StaticMathField>
        </div>
    )
}

export default Expression;