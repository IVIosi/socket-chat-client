import React, { createContext, FC } from 'react';
import './style.scss';

import { useLocalStorage } from '@helpers/hooks-helper';
import Header from '@components/header';
import Messages from '@components/messages';
import SendMessageBox from '@components/send-message-box';

export interface Settings {
  clock: '12H' | '24H';
  sendWith: 'enter' | 'cmd+enter';
  userName: string;
}

export const defaultSettings: Settings = {
  clock: '12H',
  sendWith: 'enter',
  userName: 'New User',
};

export const SettingsContext = createContext({
  settings: defaultSettings,
  setSettings: (_s: Settings) => {
    return;
  },
});

const App: FC = () => {
  const [settings, setSettings] = useLocalStorage<Settings>('settings', defaultSettings);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <Header />
      <main className="main">
        <Messages />
        <SendMessageBox />
      </main>
    </SettingsContext.Provider>
  );
};

export default App;
