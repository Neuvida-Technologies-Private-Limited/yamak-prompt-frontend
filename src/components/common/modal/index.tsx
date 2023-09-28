import React from 'react';
import { Modal } from 'antd';

interface ModalProps {
  title: string;
  centered: boolean;
  isOpen: boolean;
  sumbitHandler?: React.MouseEventHandler<HTMLButtonElement>;
  cancelModalHandler?: React.MouseEventHandler<HTMLButtonElement>;
  okText: string;
  cancelText?: string;
  className?: string;
  children?: React.ReactNode | any;
}

const index: React.FC<ModalProps> = ({
  title,
  centered,
  isOpen,
  okText,
  cancelText,
  sumbitHandler,
  cancelModalHandler,
  className,
  children,
}) => {
  return (
    <Modal
      title={title}
      centered={centered}
      open={isOpen}
      onOk={sumbitHandler}
      onCancel={cancelModalHandler}
      okText={okText}
      cancelText={cancelText}
      className={`font-poppins flex flex-start ${className}`}
    >
      {children}
    </Modal>
  );
};

export default index;
