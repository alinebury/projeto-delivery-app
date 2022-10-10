import React, { createContext } from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import CustomerProducts from '../pages/CustomerProducts';
import RenderWithRouter from './renderWithRouter';

describe('Teste Products Page', () => {
  const context = createContext();
  test('Teste se nome no header é do cliente', () => {
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

  test('Teste se existem 11 produtos na pagina', () => {
    const { getAllRole } = RenderWithRouter(<CustomerProducts />, context);
    const quantity = 11;
    const lis = getAllRole('li');

    expect(lis.length).toBe(quantity);
  });
});
