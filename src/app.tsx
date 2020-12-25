import React, { FC } from 'react';
import './style.scss';

import Header from '@components/header';
import Messages from '@components/messages';
import SendMessageBox from '@components/send-message-box';

const App: FC = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Messages />
        <SendMessageBox />
      </main>
    </>
  );
};

export default App;
