// import React, {useReducer} from 'react';

// const initialState = {
//     initialTime: 0,
//     timerType: 'count-up',
//     time: 0,
//     warningTime: 5,
//     runTimer: false
// }

function reducer(state, action) {
    switch (action.type) {
        case 'START':
            return {...state, runTimer: true};
        case 'STOP':
            return {...state, runTimer: false};
        case 'RESET':
            return {
                initialTime: 0,
                timerType: 'count-up',
                time: 0,
                warningTime: 5,
                runTimer: false
            };
        default:
            throw new Error();
    }
}

// export const getReducer = () => useReducer(reducer, initialState);
export default reducer;
