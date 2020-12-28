import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Modal, { useModal } from '@components/ui-kit/modal';
import '@testing-library/jest-dom/extend-expect';

test('Modal should be rendered', () => {
  render(
    <Modal
      close={() => {
        return;
      }}
      render={() => 'modal inner text'}
    />,
  );

  expect(screen.getByTestId('modal-root')).toBeInTheDocument();
  expect(screen.getByTestId('modal-root')).toHaveTextContent('modal inner text');
});

test('Modal should close on click on overlay', () => {
  let isOpen = true;
  render(
    <Modal
      close={() => {
        isOpen = false;
      }}
      render={() => 'modal inner text'}
    />,
  );
  expect(screen.getByTestId('modal-root')).toBeInTheDocument();
  expect(isOpen).toBe(true);

  fireEvent.click(screen.getByTestId('modal-overlay'));

  expect(isOpen).toBe(false);
});

test('Modal should close on click on close button', () => {
  let isOpen = true;
  render(
    <Modal
      close={() => {
        isOpen = false;
      }}
      render={() => 'modal inner text'}
    />,
  );
  expect(screen.getByTestId('modal-root')).toBeInTheDocument();
  expect(isOpen).toBe(true);

  fireEvent.click(screen.getByLabelText('close modal'));

  expect(isOpen).toBe(false);
});

test('Modal custom hooks works properly', () => {
  const UseModalExample = () => {
    const { open, close, openModal, closeModal } = useModal();

    return (
      <div>
        <span data-testid="isOpen">{open ? 'open' : 'not open'}</span>
        <button data-testid="open modal" onClick={openModal} />
        <span data-testid="isClose">{close ? 'close' : 'not close'}</span>
        <button data-testid="close modal" onClick={closeModal} />
      </div>
    );
  };

  render(<UseModalExample />);

  expect(screen.getByTestId('isOpen').innerHTML).toBe('not open');
  expect(screen.getByTestId('isClose').innerHTML).toBe('not close');

  fireEvent.click(screen.getByTestId('open modal'));

  expect(screen.getByTestId('isOpen').innerHTML).toBe('open');
  expect(screen.getByTestId('isClose').innerHTML).toBe('not close');

  fireEvent.click(screen.getByTestId('close modal'));

  expect(screen.getByTestId('isOpen').innerHTML).toBe('not open');
  expect(screen.getByTestId('isClose').innerHTML).toBe('close');
});
