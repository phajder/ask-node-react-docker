import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders product column', () => {
  const { getByText } = render(<App />);
  const productColumn = getByText(/Product name/i);
  expect(productColumn).toBeInTheDocument();
});
