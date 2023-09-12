import React, { useState } from 'react';
import { Drawer, Space } from 'antd';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import type { DrawerProps } from 'antd/es/drawer';
import type { RadioChangeEvent } from 'antd/es/radio';
import Button from '../button';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        size={undefined}
        type={'link'}
        shape={undefined}
        onClick={showDrawer}
        icon={<AiOutlineMenuUnfold className="!w-7 !h-full text-black" />}
      />
      <Drawer
        title="Drawer with extra actions"
        placement={'left'}
        width={500}
        onClose={onClose}
        open={open}
        extra={<Space></Space>}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;
