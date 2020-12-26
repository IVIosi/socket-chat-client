import React, { FC } from 'react';
import './style.scss';

import defaultAvatar from '@static/images/avatar.png';

const Messages: FC = () => {
  const messages = [
    {
      avatar: '',
      sender: 'self',
      content:
        'lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsumdolor',
      time: '1h ago',
    },
    {
      avatar: '',
      sender: 'guest',
      content:
        'lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsumdolor',
      time: '2h ago',
    },
    {
      avatar: '',
      sender: 'self',
      content:
        'lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsumdolor',
      time: '3h ago',
    },
    {
      avatar: '',
      sender: 'self',
      content:
        'lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsumdolor',
      time: '4h ago',
    },
    {
      avatar: '',
      sender: 'guest',
      content:
        'lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsumdolor',
      time: '5h ago',
    },
    {
      avatar: '',
      sender: 'self',
      content:
        'lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsumdolor',
      time: '6h ago',
    },
  ];
  return (
    <div className="messages">
      {messages.map((message) => (
        <div
          key={message.time}
          className={`message ${message.sender === 'self' ? 'message--sent' : 'message--received'}`}
        >
          <div className="message__avatar">
            <img width={48} src={message?.avatar || defaultAvatar} />
          </div>
          <div className="message-content">
            <div className="message-content__text">{message.content}</div>
            <div className="message-content__time">{message.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
