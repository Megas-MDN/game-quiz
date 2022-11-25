import { UPDATE_SCORE, USER_LOGIN, RESET_GAME, URL_LINK } from '../actions';

const URL_STATE = {
  urlLink: 'https://opentdb.com/api.php?amount=5&token=',
};

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  gravatarEmail: '',
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case URL_LINK:
    return {
      ...URL_STATE,
      ...state,
      urlLink: action.payload,
    };
  case RESET_GAME:
    return {
      ...state,
      ...INITIAL_STATE,
    };
  case USER_LOGIN:
    return { ...state, ...action.payload };

  case UPDATE_SCORE: return {
    ...state,
    score: state.score + action.score,
    assertions: state.assertions + 1,
  };
  default:
    return state;
  }
};
export default player;
