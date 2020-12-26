import React, { FC, useContext } from 'react';
import './style.scss';

import defaultAvatar from '@static/images/avatar.png';
import { ChatMessage, SettingsContext } from 'app';
import { formatTime } from '@helpers/strings-helper';

interface MessagesListProps {
  messages: Array<ChatMessage>;
}

const MessagesList: FC<MessagesListProps> = ({ messages }) => {
  const { settings } = useContext(SettingsContext);

  return (
    <div className="messages">
      {messages.map((message) => (
        <div
          key={message.time}
          className={`message ${
            message.userID === settings.userID ? 'message--sent' : 'message--received'
          }`}
        >
          <div className="message__avatar">
            <img src={message?.avatar || defaultAvatar} />
          </div>
          <div className="message-content">
            <div className="message-content__text">
              {message.type === 'text' ? (
                message.content
              ) : (
                <img className="message-content__image" src={message.content} />
              )}
            </div>
            <div className="message-content__time">
              {formatTime(message.time, settings.clock === '12H')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
