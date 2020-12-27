import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from '@components/ui-kit/input';
import '@testing-library/jest-dom/extend-expect';

const setup = () => {
  const utils = render(<Input defaultValue="test value" />);

  const input = utils.getByTestId('custom input') as HTMLInputElement;
  return {
    input,
    ...utils,
  };
};

test('Input should have default value', () => {
  const { input } = setup();
  expect(input.value).toBe('test value');
});

test('Input should change value', () => {
  const { input } = setup();
  expect(input.value).toBe('test value');
  fireEvent.change(input, { target: { value: 'value 1' } });
  expect(input.value).toBe('value 1');
});
