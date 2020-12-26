import React, { FC, useContext } from 'react';
import './style.scss';

import Button from '@components/ui-kit/button';
import Modal, { useModal } from '@components/ui-kit/modal';
import RadioButton from '@components/ui-kit/radio-button';
import Input from '@components/ui-kit/input';
import { SettingsContext, Settings, defaultSettings } from 'app';

const Header: FC = () => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { open, openModal, closeModal } = useModal();

  const handleUpdateSettings = (key: keyof Settings, value: string) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  const handleResetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <header className="header">
      <h1 className="header__title">Socket Chat Clinet</h1>
      <div className="header__settings">
        <Button
          type="secondary"
          onClick={openModal}
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
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          }
        >
          Settings
        </Button>
      </div>
      {open ? (
        <Modal
          close={closeModal}
          render={() => (
            <>
              <p>Username:</p>
              <Input
                defaultValue={settings.userName}
                onChange={(v) => handleUpdateSettings('userName', v)}
              />
              <p>Clock Display:</p>
              <RadioButton
                name="Clock"
                defaultValue={settings.clock}
                options={[
                  {
                    value: '12H',
                    label: '12 Hours',
                  },
                  {
                    value: '24H',
                    label: '24 Hours',
                  },
                ]}
                onChange={(v) => handleUpdateSettings('clock', v)}
              />
              <p>Send messages with:</p>
              <RadioButton
                name="send"
                defaultValue={settings.sendWith}
                options={[
                  {
                    value: 'enter',
                    label: 'Enter',
                  },
                  {
                    value: 'cmd+enter',
                    label: 'Cmd+Enter',
                  },
                ]}
                onChange={(v) => handleUpdateSettings('sendWith', v)}
              />
              <Button type="secondary" onClick={handleResetSettings}>
                Reset to default
              </Button>
            </>
          )}
        />
      ) : null}
    </header>
  );
};

export default Header;
