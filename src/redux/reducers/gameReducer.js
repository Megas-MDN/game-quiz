import { DISABLE_OPTIONS } from '../actions';

const INITIAL_STATE = {
  isDisabled: false,
  correct: '',
  wrong: '',
  showNext: false,
  showCounter: true,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DISABLE_OPTIONS: return {
    ...state,
    isDisabled: action.payload,
  };
  default:
    return state;
  }
};
export default gameReducer;
