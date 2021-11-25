import problem from './problem';
import scores from './scores';
import timer from './timer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ problem, scores, timer });

export default rootReducer;