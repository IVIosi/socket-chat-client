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

  let lastMessageUserID = 0;

  return (
    <div className="messages">
      {messages.map((message) => {
        const isSent = message.userID === settings.userID;
        const showAvatar = message.userID !== lastMessageUserID;
        lastMessageUserID = message.userID;

        return (
          <div
            key={message.time}
            className={`message ${isSent ? 'message--sent' : 'message--received'} ${
              showAvatar ? 'message--visible-avatar' : ''
            }`}
          >
            <div className={`message__avatar ${showAvatar ? '' : 'message__avatar--invisible'}`}>
              <img src={message?.avatar || defaultAvatar} />
            </div>
            <div className="message-content">
              <div className="message-content__text">
                {!isSent && <div className="message-content__username">{message.userName}</div>}
                {message.type === 'text' ? (
                  <p className="message-content__paragraph">{message.content}</p>
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
