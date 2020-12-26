import React, { FC, useContext } from 'react';
import '../style.scss';
import { SettingsContext, Settings, defaultSettings } from 'app';

import Button from '@components/ui-kit/button';
import RadioButton from '@components/ui-kit/radio-button';
import Input from '@components/ui-kit/input';

const SettingsForm: FC = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const handleUpdateSettings = (key: keyof Settings, value: string) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  const handleResetSettings = () => {
    setSettings({ ...defaultSettings, userName: settings.userName });
  };

  return (
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
            value: 'ctrl+enter',
            label: 'Ctrl+Enter',
          },
        ]}
        onChange={(v) => handleUpdateSettings('sendWith', v)}
      />
      <Button type="secondary" onClick={handleResetSettings}>
        Reset to default
      </Button>
    </>
  );
};

export default SettingsForm;
