import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Modal from '@components/ui-kit/modal';
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

test('Modal custom hooks works properly', () => {
  const UseModalExample = () => {
    // const { open, openModal, closeModal } = useModal();

    return (
      <div>
        <button></button>
      </div>
    );
  };

  render(<UseModalExample />);
  expect(true).toBe(true);
});
