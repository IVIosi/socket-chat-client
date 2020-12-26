import React, {
  ChangeEvent,
  KeyboardEvent,
  FC,
  useState,
  useContext,
  FormEvent,
  MouseEvent,
} from 'react';
import './style.scss';

import Button from '@components/ui-kit/button';
import { ChatMessage, SettingsContext } from 'app';
import Modal, { useModal } from '@components/ui-kit/modal';
import Input from '@components/ui-kit/input';
import { debounce } from '@helpers/function-helper';

interface SendMessageBoxProps {
  socketStatus: string;
  onSendMessage: (msg: ChatMessage) => void;
}

const SendMessageBox: FC<SendMessageBoxProps> = ({ socketStatus, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [imageLink, setImageLink] = useState('');
  const { open, openModal, closeModal } = useModal();
  const { settings } = useContext(SettingsContext);
  const hasError = socketStatus === 'error';

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

  const handleSendImage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (imageLink) {
      onSendMessage({
        avatar: '',
        userID: settings.userID,
        userName: settings.userName,
        content: imageLink,
        type: 'image',
        time: new Date().getTime(),
      });
      closeModal();
      setImageLink('');
    }
  };

  return (
    <form className="send-message-box" onSubmit={(e) => handleSendMessage(e)}>
      {hasError && (
        <div className="send-message-box__error">Cant connect to server! retrying...</div>
      )}
      <Button
        type="iconic"
        label="open send image form"
        disabled={hasError}
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
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
        }
        onClick={openModal}
      />
      {open && (
        <Modal
          close={closeModal}
          render={() => (
            <>
              <p>Image link:</p>
              <Input defaultValue={imageLink} onChange={debounce((v) => setImageLink(v), 1000)} />
              <a className="send-message-box__link" onClick={(e) => handleSendImage(e)}>
                send
              </a>
            </>
          )}
        />
      )}
      <textarea
        disabled={hasError}
        className="send-message-box__textarea"
        placeholder="Enter your message here"
        aria-label="message input field"
        value={message}
        onChange={handleChangeMessage}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <Button
        type="primary"
        label="send message"
        disabled={hasError}
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
        onClick={(e) => handleSendMessage(e)}
      >
        Send
      </Button>
    </form>
  );
};

export default SendMessageBox;
