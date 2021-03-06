import React, { createContext, FC, useEffect, useState } from 'react';

import './style.scss';

import { useLocalStorage, useSocket } from '@helpers/hooks-helper';
import Header from '@components/header';
import MessagesList from '@components/messages';
import SendMessageBox from '@components/send-message-box';
import { SvgSprite } from '@static/images/svg-sprite';

export interface Settings {
  clock: '12H' | '24H';
  sendWith: 'enter' | 'ctrl+enter';
  userID: number;
  userName: string;
  avatar: string;
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
  avatar: '',
};

export const SettingsContext = createContext({
  settings: defaultSettings,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <SvgSprite />
      <Header />
      <main className="main">
        <MessagesList messages={allMessages} />
        <SendMessageBox
          socketStatus={socketStatus}
          onSendMessage={(msg) => handleSendMessage(msg)}
        />
      </main>
    </SettingsContext.Provider>
  );
};

export default App;
