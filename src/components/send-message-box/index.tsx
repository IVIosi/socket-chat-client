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

import { ChatMessage, SettingsContext } from 'app';
import Button from '@components/ui-kit/button';
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
    <form
      className="send-message-box"
      data-testid="send-message-box"
      onSubmit={(e) => handleSendMessage(e)}
    >
      {hasError && (
        <div className="send-message-box__error">Cant connect to server! retrying...</div>
      )}
      <Button
        type="iconic"
        label="open send image form"
        disabled={hasError}
        icon={
          <svg className="icon">
            <use xlinkHref="#paperclip"></use>
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
        placeholder="Enter message"
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
          <svg className="icon">
            <use xlinkHref="#send"></use>
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
