import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { exact } from 'prop-types';
import App from '../App';
import Game from '../pages/Game/Game';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const correctTest = 'correct-answer';

const playGame = async () => {
  await waitFor(
    () => expect(screen.queryByTestId(correctTest)).toBeInTheDocument(),
    { timeout: 3000 },
  );

  const correct = await screen.findByTestId(correctTest);
  userEvent.click(correct);
  const btnNext = await screen.findByTestId('btn-next');
  userEvent.click(btnNext);
};

const dataEmailInput = 'input-gravatar-email';
const nomeInput = 'input-player-name';
const mockValue = {
  response_code: 3,
  results: [

  ],
};
const tokenValido = 'fe7a08faf070c77d6d18589eb15057e95583c026042ae32ab91b8e6446697620';

describe('Testa a pagina de Game', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('1 - Testa o jogo', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(dataEmailInput);
    userEvent.type(emailInput, 'joao@hotmail.com');
    const InputNomeGame = screen.getByTestId(nomeInput);
    userEvent.type(InputNomeGame, 'joao');
    const playButton = screen.getByRole('button', { name: /play/i });
    userEvent.click(playButton);
    await new Promise((r) => { setTimeout(r, 3000); });

    await playGame()
      .then(async () => await playGame())
      .then(async () => await playGame())
      .then(async () => await playGame())
      .then(async () => await playGame());

    const btnRank = await screen.findByTestId('btn-ranking');
    expect(btnRank).toBeInTheDocument();
    userEvent.click(btnRank);
  });

  test('2 - Testa quando click no incorreto', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(dataEmailInput);
    userEvent.type(emailInput, 'joao@hotmail.com');
    const InputNomeGame = screen.getByTestId(nomeInput);
    userEvent.type(InputNomeGame, 'joao');
    const playButton = screen.getByRole('button', { name: /play/i });
    userEvent.click(playButton);
    await new Promise((r) => { setTimeout(r, 3000); });
    await waitFor(() => expect(screen.findAllByTestId(/wrong-answer/i)), { timeout: 3000 });
    const incorrect = await screen.findAllByTestId(/wrong-answer/i);
    expect(incorrect[0]).toBeInTheDocument();
    userEvent.click(incorrect[0]);
  });

  test.skip('Redirect by wrong token', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(dataEmailInput);
    userEvent.type(emailInput, 'joao@hotmail.com');
    const InputNomeGame = screen.getByTestId(nomeInput);
    userEvent.type(InputNomeGame, 'joao');
    const playButton = screen.getByRole('button', { name: /play/i });
    userEvent.click(playButton);
    window.localStorage.setItem('token', 'xxx');
    await waitFor(() => expect(history.location.pathname).toBe('/'), 2000);
  });

  test.skip('3 - Espera 32s', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(dataEmailInput);
    userEvent.type(emailInput, 'joao@hotmail.com');
    const InputNomeGame = screen.getByTestId(nomeInput);
    userEvent.type(InputNomeGame, 'joao');
    const playButton = screen.getByRole('button', { name: /play/i });
    userEvent.click(playButton);
    // jest.setTimeout(33000)
    await new Promise((r) => { setTimeout(r, 3000); });
    expect(clearInterval).toHaveBeenCalledWith(expect.any(Number));
  });

  test.skip('Testa se quando o token e invalido a pagina e redirecinada', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(mockValue) });
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(dataEmailInput);
    userEvent.type(emailInput, 'joao@hotmail.com');
    const InputNomeGame = screen.getByTestId(nomeInput);
    userEvent.type(InputNomeGame, 'joao');
    const playButton = screen.getByRole('button', { name: /play/i });
    userEvent.click(playButton);
    await new Promise((r) => { setTimeout(r, 2000); });
    expect(history.location.pathname).toBe('/');
    const token = localStorage.getItem('token');
    expect(token).toBe('');
  });
});

describe('Sintonia fina', () => {
  jest.setTimeout(45000);

  afterEach(() => {
    jest.resetAllMocks();
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Handle cont', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(dataEmailInput);
    userEvent.type(emailInput, 'joao@hotmail.com');
    const InputNomeGame = screen.getByTestId(nomeInput);
    userEvent.type(InputNomeGame, 'joao');
    const playButton = screen.getByRole('button', { name: /play/i });
    userEvent.click(playButton);
    await new Promise((r) => { setTimeout(r, 2000); });

    await waitFor(() => {
      const btnNext = screen.getByTestId('btn-next');
      expect(btnNext).toBeInTheDocument();
    }, { timeout: 40000 });
    expect(screen.getByTestId('btn-next')).toBeInTheDocument();
  });

  it('Handle Redirect', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(mockValue) });
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(dataEmailInput);
    userEvent.type(emailInput, 'joao@hotmail.com');
    const InputNomeGame = screen.getByTestId(nomeInput);
    userEvent.type(InputNomeGame, 'joao');
    const playButton = screen.getByRole('button', { name: /play/i });
    userEvent.click(playButton);
    await new Promise((r) => { setTimeout(r, 3000); });
    await waitFor(() => expect(history.location.pathname).toBe('/'), 2000);
    jest.clearAllMocks();
  });
});
