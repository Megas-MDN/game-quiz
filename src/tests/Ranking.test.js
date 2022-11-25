import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa o componente Ranking', () => {
  afterEach(() => {
    jest.resetAllMocks();
    }) 
beforeEach(() => {
  jest.resetAllMocks();
}) 
  test('Testa se ao clicar no botão Go Home, é redirecionado para "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => { history.push('/ranking'); });

    const btnHome = screen.getByRole('button', { name: /Go home/i });
    expect(btnHome).toBeInTheDocument();

    userEvent.click(btnHome);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });
});