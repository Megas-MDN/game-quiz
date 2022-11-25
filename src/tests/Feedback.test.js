import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa o componente Feedback', () => {
  afterEach(() => {
    jest.resetAllMocks();
    }) 
beforeEach(() => {
  jest.resetAllMocks();
}) 

      
  test('Testa se ao clicar no botão Play Again, é redirecinado para o Login "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => { history.push('/feedback'); });

    const btnPlayAgain = screen.getByRole('button', { name: /Play Again/i });
    expect(btnPlayAgain).toBeInTheDocument();
    userEvent.click(btnPlayAgain);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/')
  });

  test('Testa se ao clicar no botão Ranking, é redirecionado para o Ranking "/ranking"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => { history.push('/feedback'); });

    const btnRanking = screen.getByRole('button', { name: /Ranking/i });
    expect(btnRanking).toBeInTheDocument();
    userEvent.click(btnRanking);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/ranking');
  });
});