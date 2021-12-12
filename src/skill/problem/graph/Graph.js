import React, {useEffect, useRef} from 'react';
import Desmos from 'desmos';
import {solutionTableDef, userTableDef, lineDef} from './calcDef';

import './Graph.css';

/** Graph component for McCool Math app 
 * Creates blank tables for user points and solution points
 * Creates blank line for solution line
 * 
 * Plots point when user clicks on grid
 * Removes point on subsequent click on same point 
*/
const Graph = ({ calculator, setCalculator }) => {
    const wrapperRef = useRef();

    //Set up calculator  
    useEffect(() => {
        const calc = Desmos.GraphingCalculator(wrapperRef.current, 
            {expressions : false, lockViewport : true, settingsMenu: false}
        );

        calc.setExpression({...solutionTableDef});
        calc.setExpression({...userTableDef});
        calc.setExpression({...lineDef});

        setCalculator(calc);

        return () => calc.destroy();
    }, [])
 
    //Plot points on graph
    const plotPoint = (evt) => {
        const calculatorRect = calculator.domChangeDetector.elt.getBoundingClientRect();
    
        const pixel_x = evt.clientX - calculatorRect.left;
        const pixel_y = evt.clientY - calculatorRect.top;
    
        const point = calculator.pixelsToMath({x : pixel_x, y: pixel_y});
    
        point.x = Math.round(point.x);
        point.y = Math.round(point.y);

        const userTable = calculator.getExpressions().find(obj => obj['id'] === 'userTable');
        const xCoords = userTable.columns[0].values;
        const yCoords = userTable.columns[1].values;

        let newPoint = true;

        for (let i = 0; i < xCoords.length; i++) {
            if (+xCoords[i] === point.x && +yCoords[i] === point.y) {
                xCoords.splice(i, 1);
                yCoords.splice(i, 1);
                newPoint = false;
            } 
        }
    
        if (newPoint) {
            xCoords.push(point.x);
            yCoords.push(point.y);
        }

        userTable.columns[0].values = xCoords;
        userTable.columns[1].values = yCoords;

        calculator.setExpression(userTable);
    }


    return (
        <div className="Graph-calculator" ref={wrapperRef} onClick={plotPoint}></div>
    )
}

export default Graph;