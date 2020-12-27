import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Header from '@components/header';
import '@testing-library/jest-dom/extend-expect';

test('Header should load and display title', () => {
  render(<Header />);

  expect(screen.getByRole('heading')).toHaveTextContent('Socket Chat Client');
});

test('Header should load and display settings modal', () => {
  render(<Header />);

  fireEvent.click(screen.getByLabelText('open settings'));

  expect(document.body).toContainElement(screen.getByTestId('modal-root'));
});
