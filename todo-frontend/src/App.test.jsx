import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders Todo App navbar', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const brandElement = screen.getByText(/Todo App/i);
  expect(brandElement).toBeInTheDocument();
});
