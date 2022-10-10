import React, { createContext } from 'react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import RenderWithRouter from './renderWithRouter';
import { getUser } from '../services/localStorage';

const attribute = {
  emailInput: 'common_login__input-email',
  emailValidate: 'zebirita@email.com',
  passwordInput: 'common_login__input-password',
  passwordValidate: '$#zebirita#$',
  loginSubmit: 'common_login__button-login',
};

describe('Teste Login Page', () => {
  const context = createContext();
  test('Teste se a página contém os inputs email e password', () => {
    const { getByTestId } = RenderWithRouter(<Login />, context);

    const inputEmail = getByTestId(attribute.emailInput);
    const inputPass = getByTestId(attribute.passwordInput);

    expect(inputEmail).toBeTruthy();
    expect(inputPass).toBeTruthy();
  });

  test('Teste se é possível escrever no input email e password', () => {
    const { getByTestId } = RenderWithRouter(<Login />, context);
    const inputEmail = getByTestId(attribute.emailInput);
    const inputPass = getByTestId(attribute.passwordInput);

    userEvent.type(inputEmail, '');
    userEvent.type(inputEmail, attribute.emailValidate);
    expect(inputEmail.value).toBe(attribute.emailValidate);

    userEvent.type(inputPass, '');
    userEvent.type(inputPass, attribute.passwordValidate);
    expect(inputPass.value).toBe(attribute.passwordValidate);
  });

  test(`Teste se o botão estiver desabilitado ou
  habilitado de acordo com a validação de e-mail e password`, () => {
    const { getByTestId } = RenderWithRouter(<Login />, context);
    const inputEmail = getByTestId(attribute.emailInput);
    const inputPass = getByTestId(attribute.passwordInput);
    const loginButton = getByTestId(attribute.loginSubmit);

    userEvent.type(inputEmail, 'testeteste.com');
    userEvent.type(inputPass, '12345');
    expect(loginButton).toBeTruthy();
    expect(loginButton.disabled).toBe(true);

    userEvent.type(inputEmail, attribute.emailValidate);
    userEvent.type(inputPass, attribute.passwordValidate);

    expect(loginButton).toBeTruthy();
    expect(loginButton.disabled).toBe(false);
  });

  test.skip('Teste se após logar o usuário está salvo no localStorage', () => {
    const { getByTestId } = RenderWithRouter(<Login />, context);
    const inputEmail = getByTestId(attribute.emailInput);
    const inputPass = getByTestId(attribute.passwordInput);
    const loginButton = getByTestId(attribute.loginSubmit);

    userEvent.type(inputEmail, attribute.emailValidate);
    userEvent.type(inputPass, attribute.passwordValidate);
    userEvent.click(loginButton);

    const user = getUser();
    expect(user).toBeTruthy();
  });

  test.skip('Teste se após logar o usuário será redirecionado products page', () => {
    const { getByTestId, history } = RenderWithRouter(<Login />, context);
    const inputEmail = getByTestId(attribute.emailInput);
    const inputPass = getByTestId(attribute.passwordInput);
    const loginButton = getByTestId(attribute.loginSubmit);

    userEvent.type(inputEmail, attribute.emailValidate);
    userEvent.type(inputPass, attribute.passwordValidate);
    userEvent.click(loginButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/customer/products');
  });
});
