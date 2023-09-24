import React, { useState } from 'react';
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { Button, Input, Modal } from 'components/common';
import { Workspace, InputVariants } from 'utils/constants';
import CollapseItem from './collapseItem';

interface CreateWorkspaceProps {
  btnName: string;
  className?: string;
}

const App: React.FC<CreateWorkspaceProps> = ({ btnName, className }) => {
  const [showModal, setShowModal] = useState(false);

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: Workspace.Select,
      children: <CollapseItem />,
    },
  ];

  const handleChange = () => {};

  return (
    <>
      <Button
        type="default"
        onClick={() => setShowModal(true)}
        size={'middle'}
        shape={undefined}
        name={btnName}
        className={`createWorkspace bg-primary text-white hover:text-white border-none font-poppins hover:bg-hoverPrimary ${className}`}
      />
      <Modal
        title={Workspace.CreateWorkspace}
        centered={true}
        isOpen={showModal}
        sumbitHandler={() => setShowModal(true)}
        cancelModalHandler={() => setShowModal(false)}
        okText={Workspace.Create}
        className="createWorkspace"
      >
        <div className="flex flex-col">
          <p className="text-gray500 pb-3">{Workspace.Subhead3}</p>
          <form action="#" method="post">
            <Input
              id={Workspace.Name}
              name={Workspace.Name}
              placeholder={Workspace.Name}
              onChange={handleChange}
              variant={InputVariants.Filled}
            />
            <Collapse
              expandIconPosition={'end'}
              items={items}
              className="workspace font-poppins border-none bg-gray50"
            />
          </form>
        </div>
      </Modal>
    </>
  );
};

export default App;
