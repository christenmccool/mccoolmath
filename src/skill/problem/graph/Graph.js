import React, {useState, useEffect, useRef} from 'react';
import Desmos from 'desmos';
import Button from '../../Button';
import {solutionTableDef, userTableDef, lineDef, userLineDef} from './calcDef';

import './Graph.css';

/** Graph component for McCool Math app 
 * Initialize with tables for user points, user line, solution points, and solution line
 * 
 * Plots point when user clicks on grid, remove points on subsequent click or reset button click (mobile)
 * For graph type problem, automatically connect three points with line
*/
const Graph = ({ calculator, setCalculator, setWarning, problem, checkBtnRef }) => {
    //Maintain user points in state in order to connect with line when 3 points are plotted
    const [userXCoords, setUserXCoords] = useState([]);
    const [userYCoords, setUserYCoords] = useState([]);
    const wrapperRef = useRef();

    //Set up calculator  
    useEffect(() => {
        const calc = Desmos.GraphingCalculator(wrapperRef.current, 
            {expressions : false, lockViewport : true, settingsMenu: false, trace: false}
        );

        calc.setExpression(solutionTableDef);
        calc.setExpression(userTableDef);
        calc.setExpression(lineDef);
        calc.setExpression(userLineDef);

        setCalculator(calc);

        return () => calc.destroy();
    }, [])

    //Reset calculator when problem arguments change  
    //Graph type: blank graph
    //Equation type: display problem's line
    useEffect(() => {
        if (!calculator) return;

        calculator.setExpression(solutionTableDef);
        calculator.setExpression(userTableDef);
        calculator.setExpression(lineDef);
        calculator.setExpression(userLineDef);
        setUserXCoords([]);
        setUserYCoords([]);

        //For an equation problem, use the problem's points to compute line to display
        //Do not graph points
        if (calculator && problem.args && problem.args.type === 'equation') {
            const xCoords = problem.args.points[0];
            const yCoords = problem.args.points[1];
            const m = (yCoords[1] - yCoords[0])/(xCoords[1] - xCoords[0]);
            const b = yCoords[0] - m * xCoords[0];
            calculator.setExpression({id:'line', latex: `${m}x+${b}`});
        }
    }, [problem.args])

    //When correct answer is submitted or requested, show solution line and points
    //Reset user points when status is null  
    useEffect(() => {
        if (!calculator || problem.status === 'incorrect') return;

        if (problem.status === null) {
            calculator.setExpression(userLineDef);
            setUserXCoords([]);
            setUserYCoords([]);
            return;
        } 
        
        const solutionXCoords = problem.args.type === "graph" ? problem.correctAnswer[0] : problem.args.points[0];
        const solutionYCoords = problem.args.type === "graph" ? problem.correctAnswer[1] : problem.args.points[1];
        setTable('solutionTable', solutionXCoords, solutionYCoords);

        if (problem.args.type === "graph") {
            calculator.setExpression({id:'line', latex: problem.latex});
            calculator.setExpression({id:'userLine', latex: null});
        } 
    }, [problem.status])

    //Sets Desmos calculator userTable to userXCoords and userYCoords stored in state
    //Graph type: connect points with line once 3 points are plotted
    //Only straight line allowed
    useEffect(() => {
        if (!calculator) return;
        setTable('userTable', userXCoords, userYCoords);

        if (problem.args && problem.args.type === 'equation') return;

        setWarning(null);
        calculator.setExpression({id:'userLine', latex: null});

        if (userXCoords.length < 3) return;

        const userM = (userYCoords[1] - userYCoords[0]) / (userXCoords[1] - userXCoords[0]);
        for (let i = 2; i < userXCoords.length; i++) {
            const newM = (userYCoords[i] - userYCoords[i-1]) / (userXCoords[i] - userXCoords[i-1]);
            if (newM !== userM) {
                setWarning("Points must form a straight line")
                return;
            }
        }
        const userB = userYCoords[0] - userM * userXCoords[0];
        calculator.setExpression({id:'userLine', latex: `${userM}x+${userB}`});
        checkBtnRef.current.focus();

    }, [userXCoords])  
    
    //Helper function to set table to include given array of x coordinates and array for y coordinates 
    const setTable = (id, xCoords, yCoords, hidden=false) => {
        const tableCopy = id === 'solutionTable' ? {...solutionTableDef} : {...userTableDef}
        const tableColX = {...tableCopy.columns[0]};
        const tableColY = {...tableCopy.columns[1]};
    
        tableColX.values =  xCoords;
        tableColY.values =  yCoords;
        tableColY.hidden =  hidden;
        tableCopy.columns = [tableColX, tableColY];
        calculator.setExpression(tableCopy);
    }

    //Place user points in state on click
    //Remove from state on subsequent click
    //Triggers useEffect to update Desmos calculator userTable
    const plotPoint = (evt) => {

        if ((problem.args && problem.args.type === "equation") || problem.status !== null) return;

        const calculatorRect = calculator.domChangeDetector.elt.getBoundingClientRect();
    
        const pixel_x = evt.clientX - calculatorRect.left;
        const pixel_y = evt.clientY - calculatorRect.top;
    
        const point = calculator.pixelsToMath({x : pixel_x, y: pixel_y});
    
        point.x = Math.round(point.x);
        point.y = Math.round(point.y);

        let newPoint = true;

        for (let ind = 0; ind < userXCoords.length; ind++) {
            if (userXCoords[ind] === point.x && userYCoords[ind] === point.y) {
                setUserXCoords(userXCoords.filter((ele, i) => i!==ind));
                setUserYCoords(userYCoords.filter((ele, i) => i!==ind));
                newPoint = false;
            } 
        }
    
        if (newPoint) {
            setUserXCoords([...userXCoords, point.x]);
            setUserYCoords([...userYCoords, point.y]);
        }
    }

    const clearUserPoints = () => {
        if (problem.status !== null) return;

        calculator.setExpression(userTableDef);
        setUserXCoords([]);
        setUserYCoords([]);
    }

    const showPoints = () => {
        const solutionTable = calculator.getExpressions().find(obj => obj['id'] === 'solutionTable');
        if (solutionTable.columns[0].values.length === 0) {
            const solutionXCoords = problem.args.points[0];
            const solutionYCoords = problem.args.points[1];
            setTable('solutionTable', solutionXCoords, solutionYCoords);
            return;
        }
        calculator.setExpression(solutionTableDef);
    }

    return (
        <div className="Graph">
            <div className="Graph-calculator" ref={wrapperRef} onClick={plotPoint}></div>
            
            {!problem.status ? 
                <div className="Graph-button">
                    {problem.args && problem.args.type === "graph" ?
                        <Button text="Clear" type="graph" handleClick={clearUserPoints} />
                        :
                        <Button text="Points" type="graph" handleClick={showPoints} />
                    }
                </div>
                : 
                null
            }
        </div>
    )
}

export default Graph;