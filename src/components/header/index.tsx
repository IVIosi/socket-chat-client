import React, { FC } from 'react';
import './style.scss';

import Button from '@components/ui-kit/button';
import Modal, { useModal } from '@components/ui-kit/modal';
import SettingsForm from '@components/settings-form';

const Header: FC = () => {
  const { open, openModal, closeModal } = useModal();

  return (
    <header className="header">
      <h1 className="header__title">Socket Chat Client</h1>
      <div className="header__settings">
        <Button
          type="secondary"
          label="open settings"
          onClick={openModal}
          icon={
            <svg className="icon">
              <use xlinkHref="#settings"></use>
            </svg>
          }
        >
          Settings
        </Button>
      </div>
      {open && <Modal close={closeModal} render={() => <SettingsForm />} />}
    </header>
  );
};

export default Header;
