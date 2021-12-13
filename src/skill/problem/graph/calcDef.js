import Desmos from 'desmos';

const solutionTableDef = {
    id: 'solutionTable',
    type: 'table',
    columns: [
        {latex: 'x_2', values: [], pointSize: 15},
        {latex: 'y_2', values: [], pointSize: 15, color: Desmos.Colors.ORANGE, hidden: false}
    ]
};

const userTableDef = {
    id: 'userTable',
    type: 'table',
    columns: [
        {latex: 'x_1', values: [], pointSize: 15},
        {latex: 'y_1', values: [], pointSize: 15, color: Desmos.Colors.BLUE, hidden: false}
    ]
};

const lineDef = {id: 'line', latex: null, color: Desmos.Colors.PURPLE};

const userLineDef = {id: 'userline', latex: null, color: Desmos.Colors.GREEN};


export {solutionTableDef, userTableDef, lineDef, userLineDef};