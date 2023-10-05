import react, { ReactNode } from 'react';
import { message, Popconfirm } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';

interface PopConfirmProps {
  item: ReactNode;
  isOpen: boolean;
  handlePopupConfirm: (open: boolean) => void;
  onConfirm: () => Promise<boolean | undefined>;
  title: string;
  description: string;
  successMessage?: string;
  placement: TooltipPlacement | undefined;
}

const PopupConfirm: React.FC<PopConfirmProps> = ({
  item,
  isOpen,
  handlePopupConfirm,
  onConfirm,
  title,
  description,
  successMessage,
  placement,
}) => {
  const confirm = async () => {
    handlePopupConfirm(false);
    if (await onConfirm()) {
      message.success(successMessage);
    } else {
      message.error('Error in deleting !');
    }
  };

  const cancel = () => {
    handlePopupConfirm(false);
  };

  return (
    <div className="">
      <Popconfirm
        title={title}
        placement={placement}
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
