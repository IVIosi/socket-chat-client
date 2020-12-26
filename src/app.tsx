import React, { createContext, FC, useEffect, useState } from 'react';

import './style.scss';

import { useLocalStorage, useSocket } from '@helpers/hooks-helper';
import Header from '@components/header';
import MessagesList from '@components/messages';
import SendMessageBox from '@components/send-message-box';

export interface Settings {
  clock: '12H' | '24H';
  sendWith: 'enter' | 'ctrl+enter';
  userID: number;
  userName: string;
}

export interface ChatMessage {
  avatar: string;
  userID: number;
  userName: string;
  type: 'text' | 'image';
  content: string;
  time: number;
}

export const defaultSettings: Settings = {
  clock: '12H',
  sendWith: 'enter',
  userID: Date.now(),
  userName: `NewUser`,
};

export const SettingsContext = createContext({
  settings: defaultSettings,
  setSettings: (_s: Settings) => {
    return;
  },
});

const App: FC = () => {
  const [settings, setSettings] = useLocalStorage<Settings>('settings', defaultSettings);
  const { socket, socketStatus } = useSocket();
  const [allMessages, setAllMessages] = useState<Array<ChatMessage>>([]);

  useEffect(() => {
    socket?.on('chat message', (msg: string) => {
      const parsedMessage = JSON.parse(msg) as ChatMessage;
      setAllMessages((prevState) => [...prevState, parsedMessage]);
    });
  }, [socket]);

  const handleSendMessage = (msg: ChatMessage) => {
    socket?.emit('chat message', JSON.stringify(msg));
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <Header />
      <main className="main">
        <MessagesList socketStatus={socketStatus} messages={allMessages} />
        <SendMessageBox
          disabled={socketStatus === 'error'}
          onSendMessage={(msg) => handleSendMessage(msg)}
        />
      </main>
    </SettingsContext.Provider>
  );
};

export default App;
