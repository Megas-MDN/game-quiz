import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa o componente Login', () => {
  afterEach(() => {
    jest.resetAllMocks();
    }) 
beforeEach(() => {
  jest.resetAllMocks();
}) 
  const name = 'Lucas Cavalheri';
  const email = 'cav.catecumenal@outlook.com';
  const dataNameInput = 'input-player-name';
  const dataEmailInput = 'input-gravatar-email';
  const timeout = 1500;

  test('Testa se os inputs estão preenchidos', () => {
    
    renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId(dataNameInput);
    const emailInput = screen.getByTestId(dataEmailInput);

    userEvent.type(nameInput, name);
    userEvent.type(emailInput, email);
  });

  test('Testa se o botão desativa se não houver nada nos inputs', () => {
    renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId(dataNameInput);
    const emailInput = screen.getByTestId(dataEmailInput);
    const btn = screen.getByRole('button', { name: /Play/i });

    expect(btn).toBeDisabled();

    userEvent.type(nameInput, name);
    expect(btn).toBeDisabled();

    userEvent.type(emailInput, email);
    expect(btn).toBeEnabled();

    userEvent.clear(nameInput);
    userEvent.clear(emailInput);

    expect(btn).toBeDisabled();
  });

  test('Testa se o botão ativa se houver algo nos dois inputs e o email estiver no formato correto', () => {
    renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId(dataNameInput);
    const emailInput = screen.getByTestId(dataEmailInput);
    const btn = screen.getByRole('button', { name: /Play/i });

    userEvent.type(nameInput, name);
    userEvent.type(emailInput, email);
    expect(btn).toBeEnabled();

    userEvent.clear(nameInput);
    userEvent.clear(emailInput);

    userEvent.type(nameInput, name)
    userEvent.type(emailInput, 'email');
    expect(btn).toBeDisabled();
  });

  test('Testa se ao clicar no botão de Play, é redirecionado para a rota /game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId(dataNameInput);
    const emailInput = screen.getByTestId(dataEmailInput);
    const btn = screen.getByRole('button', { name: /Play/i });

    userEvent.type(nameInput, name);
    userEvent.type(emailInput, email);
    expect(btn).toBeEnabled();
    userEvent.click(btn)

    await new Promise((r) => { setTimeout(r, timeout); });

    const { location: { pathname } } = history;

    expect(pathname).toBe('/game')
  });

  test('Testa se ao clicar no botão de Configuração, é redirecionado para a rota /config', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const btn = screen.getByRole('button', { name: /Configurações/i });
    expect(btn).toBeInTheDocument();

    userEvent.click(btn);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/config')
  });
});