import { Modal } from 'components/common';
import React, { SetStateAction, Dispatch } from 'react';

interface DeleteModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onDelete: () => Promise<void>;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  showModal,
  onDelete,
  setShowModal,
}) => {
  return (
    <Modal
      title={'Do you want to delete this workspace?'}
      centered={true}
      isOpen={showModal}
      sumbitHandler={onDelete}
      cancelModalHandler={() => {
        setShowModal(false);
      }}
      okText={'Yes'}
      cancelText="No"
      closeIcon={false}
    />
  );
};

export default DeleteModal;
