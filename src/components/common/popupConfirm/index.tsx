import react, { ReactNode } from 'react';
import { message, Popconfirm } from 'antd';

interface PopConfirmProps {
  item: ReactNode;
  isOpen: boolean;
  handlePopupConfirm: (open: boolean) => void;
  onConfirm: () => Promise<boolean | undefined>;
  title: string;
  description: string;
}

const PopupConfirm: React.FC<PopConfirmProps> = ({
  item,
  isOpen,
  handlePopupConfirm,
  onConfirm,
  title,
  description,
}) => {
  const confirm = async () => {
    handlePopupConfirm(false);
    if (await onConfirm()) {
      message.success('Key Deleted !');
    } else {
      message.error('Error in deleting key !');
    }
  };

  const cancel = () => {
    handlePopupConfirm(false);
  };

  return (
    <div className="">
      <Popconfirm
        title={title}
        description={description}
        open={isOpen}
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
        className="!font-poppins"
      >
        {item}
      </Popconfirm>
    </div>
  );
};

export default PopupConfirm;
