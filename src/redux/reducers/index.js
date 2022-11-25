import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import player from './playerReducer';

const rootReducer = combineReducers({
  player,
  gameReducer,
});
export default rootReducer;
