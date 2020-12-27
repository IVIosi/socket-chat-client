import React, { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './style.scss';

const Portal: FC = ({ children }) => {
  let modalRoot = document.getElementById('modal');

  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal');
    document.body.appendChild(modalRoot);
  }

  const modalElement = document.createElement('div');

  useEffect(() => {
    modalRoot?.appendChild(modalElement);
    return () => {
      modalRoot?.removeChild(modalElement);
    };
  });

  return createPortal(children, modalElement);
};

interface ModalHook {
  open: boolean;
  close: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModal = (): ModalHook => {
  const [open, onOpenModal] = useState(false);
  const [close, onCloseModal] = useState(false);

  const openModal = () => {
    onOpenModal(true);
  };

  const closeModal = () => {
    onCloseModal(true);
    onOpenModal(false);
  };

  return { open, close, openModal, closeModal };
};

interface ModalProps {
  close: () => void;
  render: (c: ReactNode) => ReactNode;
}

const Modal: FC<ModalProps> = ({ children, close, render }) => {
  return (
    <Portal>
      <div className="modal" data-testid="modal-root">
        <div className="modal__parent">
          <div className="modal__header">
            <button className="modal__close-button" onClick={close} />
          </div>
          {render(children) || children}
        </div>
      </div>
      <div className="modal__overlay" data-testid="modal-overlay" onClick={close} />
    </Portal>
  );
};

export default Modal;
