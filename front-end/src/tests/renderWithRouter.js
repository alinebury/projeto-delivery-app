import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import MyProvider from '../context/myProvider';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <MyProvider>
        <BrowserRouter
          history={ history }
        >
          {component}
        </BrowserRouter>
      </MyProvider>,
    ),
    history,
  });
};

export default renderWithRouter;
