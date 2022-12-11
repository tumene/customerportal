import React, { useMemo, useState } from "react";
import { Modal } from "antd";

export default function useModal(defaultValue = false) {
  const [modalIsOpen, setModalIsOpen] = useState(defaultValue);

  const openModal = () => setModalIsOpen(true);

  const closeModal = () => setModalIsOpen(false);

  const BaseModal = useMemo(() => {
    return ({ children, ...props }) => {
      return (
        <Modal open={modalIsOpen} onCancel={closeModal} {...props}>
          {children}
        </Modal>
      );
    };
  }, [modalIsOpen]);

  return [BaseModal, openModal, closeModal, modalIsOpen];
}
