import React, { ChangeEvent, KeyboardEvent, FC, useState, useContext, FormEvent } from 'react';
import './style.scss';

import Button from '@components/ui-kit/button';
import { ChatMessage, SettingsContext } from 'app';

interface SendMessageBoxProps {
  onSendMessage: (msg: ChatMessage) => void;
}

const SendMessageBox: FC<SendMessageBoxProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const { settings } = useContext(SettingsContext);

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (settings.sendWith === 'enter') {
        e.preventDefault();

        handleSendMessage();
      } else if (settings.sendWith === 'ctrl+enter' && e.ctrlKey) {
        handleSendMessage();
      }
    }
  };

  const handleSendMessage = (e?: FormEvent) => {
    e && e.preventDefault();
    if (message) {
      onSendMessage({
        avatar: '',
        userID: settings.userID,
        userName: settings.userName,
        content: message,
        type: 'text',
        time: new Date().getTime(),
      });
      setMessage('');
    }
  };

  return (
    <form className="send-message-box" onSubmit={(e) => handleSendMessage(e)}>
      <textarea
        className="send-message-box__textarea"
        placeholder="Enter your message here"
        value={message}
        onChange={handleChangeMessage}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <Button
        type="primary"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        }
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </form>
  );
};

export default SendMessageBox;
