import React, { FC, useContext } from 'react';
import './style.scss';

import { ChatMessage, SettingsContext } from 'app';
import defaultAvatar from '@static/images/avatar.png';
import { formatTime } from '@helpers/strings-helper';

interface MessagesListProps {
  messages: Array<ChatMessage>;
}

const MessagesList: FC<MessagesListProps> = ({ messages }) => {
  const { settings } = useContext(SettingsContext);

  return (
    <div className="messages">
      {messages.map((message) => {
        const isSent = message.userID === settings.userID;

        return (
          <div
            key={message.time}
            className={`message ${isSent ? 'message--sent' : 'message--received'}`}
          >
            <div className="message__avatar">
              <img src={message?.avatar || defaultAvatar} />
            </div>
            <div className="message-content">
              <div className="message-content__text">
                {!isSent && <div className="message-content__username">{message.userName}</div>}
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
        );
      })}
    </div>
  );
};

export default MessagesList;
