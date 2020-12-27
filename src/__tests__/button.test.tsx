import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '@components/ui-kit/button';
import '@testing-library/jest-dom/extend-expect';

test('Button should be disabled', () => {
  render(<Button type="primary" label="disabled button" disabled={true} />);

  expect(screen.getByLabelText('disabled button')).toBeDisabled();
});

test('Button should have icon', () => {
  render(<Button type="primary" label="button with icon" icon="test icon" />);

  expect(screen.getByLabelText('button with icon').childNodes[0]).toContainHTML(
    '<div class="button__icon">test icon</div>',
  );
});

test('Button should have text', () => {
  render(
    <Button type="primary" label="button with text">
      Example
    </Button>,
  );

  expect(screen.getByLabelText('button with text').childNodes[0]).toContainHTML(
    '<div class="button__text">Example</div>',
  );
});

test('Button should have text and icon', () => {
  render(
    <Button type="primary" label="button with text and icon" icon="test icon">
      Example
    </Button>,
  );

  expect(screen.getByLabelText('button with text and icon').childNodes[0]).toContainHTML(
    '<div class="button__icon">test icon</div>',
  );

  expect(screen.getByLabelText('button with text and icon').childNodes[1]).toContainHTML(
    '<div class="button__text">Example</div>',
  );
});
