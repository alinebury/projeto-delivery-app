import React, { createContext } from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import CustomerProducts from '../pages/CustomerProducts';
import RenderWithRouter from './renderWithRouter';

const attributes = {
  customerName: 'customer_products__element-navbar-user-full-name',
  buttonLogout: 'customer_products__element-navbar-link-logout',
};

describe('Teste Register Page', () => {
  const context = createContext();
  test('Teste se a página contém os header com nome do cliente', () => {
    const { getByTestId } = RenderWithRouter(<CustomerProducts />, context);

    const customer = getByTestId(attributes.customerName);

    expect(customer).toBeInTheDocument();
  });

  test('Teste se ao clicar no botão SAIR é redirecionado para tela inicial', () => {
    const { getByTestId, history } = RenderWithRouter(<CustomerProducts />, context);
    const button = getByTestId(attributes.buttonLogout);

    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
