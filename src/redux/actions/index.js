export const USER_LOGIN = 'USER_LOGIN';
export const DISABLE_OPTIONS = 'DISABLE_OPTIONS';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const RESET_GAME = 'RESET_GAME';
export const URL_LINK = 'URL_LINK';

export const login = (value) => ({ type: USER_LOGIN, payload: value });

export const disableOptions = (payload) => ({ type: DISABLE_OPTIONS, payload });

export const updateScore = (score) => ({ type: UPDATE_SCORE, score });

export const resetGame = () => ({ type: RESET_GAME });

const preLink = 'https://opentdb.com/api.php?';

export const setLink = (link) => ({
  type: URL_LINK,
  payload: (preLink + link),
});
