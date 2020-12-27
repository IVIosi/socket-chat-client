import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SendMessageBox from '@components/send-message-box';
import '@testing-library/jest-dom/extend-expect';

test('It should show error message on socket has error', () => {
  render(
    <SendMessageBox
      socketStatus="error"
      onSendMessage={() => {
        return;
      }}
    />,
  );

  const sendMessageBox = screen.getByTestId('send-message-box');

  expect(sendMessageBox).toHaveTextContent('Cant connect to server! retrying...');

  expect(screen.getByLabelText('message input field')).toBeDisabled();
});

test("It should disable send message box's buttons", () => {
  render(
    <SendMessageBox
      socketStatus="error"
      onSendMessage={() => {
        return;
      }}
    />,
  );

  expect(screen.getByLabelText('open send image form')).toBeDisabled();
  expect(screen.getByLabelText('send message')).toBeDisabled();
});

test('It should load and display send image modal', () => {
  render(
    <SendMessageBox
      socketStatus="success"
      onSendMessage={() => {
        return;
      }}
    />,
  );
  fireEvent.click(screen.getByLabelText('open send image form'));

  expect(document.body).toContainElement(screen.getByTestId('modal-root'));
});
