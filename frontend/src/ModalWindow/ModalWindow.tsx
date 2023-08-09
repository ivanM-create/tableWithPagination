import React from 'react';
import Modal from 'react-modal';
import reportConfig from '../data/report-config.json';
import './ModalWindow.css';

type ReportData = {
  [key: string]: string | number;
};

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  info: ReportData | null;
};

function ModalWindow({ modalIsOpen, closeModal, info }: ModalProps): JSX.Element {
  const modalContent = (
    <div className="modalWindow">
      <h2>Подробная информация</h2>
      <div className="modalBlock">
        <h4>{reportConfig.columns[0].caption}:</h4>
        <p>{info?.product}</p>
      </div>
      <div className="modalBlock">
        <h4>{reportConfig.columns[1].caption}:</h4>
        <p>{info?.quantity}</p>
      </div>
      <div className="modalBlock">
        <h4>{reportConfig.columns[2].caption}:</h4>
        <p>{info?.price}</p>
      </div>
      <button type="button" onClick={closeModal} className="modalWindowCloseBtn">
        Закрыть
      </button>
    </div>
  );

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="custom-modal">
      {modalContent}
    </Modal>
  );
}

export default ModalWindow;
