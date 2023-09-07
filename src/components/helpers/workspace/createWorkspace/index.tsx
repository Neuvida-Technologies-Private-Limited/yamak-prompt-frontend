import React, { useState } from 'react';
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { Button, Input, Modal } from 'components/common';
import { Workspace } from 'utils/constants';
import CollapseItem from './collapseItem';

const App: React.FC = () => {
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
        name="Create"
        className="createWorkspace bg-primary text-white hover:text-white border-none font-poppins hover:bg-hoverPrimary"
      />
      <Modal
        title={Workspace.Create}
        centered={true}
        isOpen={showModal}
        showModalHandler={() => setShowModal(true)}
        cancelModalHandler={() => setShowModal(false)}
        okText={'Create'}
        className="createWorkspace"
      >
        <div className="flex flex-col">
          <p className="text-gray400 pb-3">{Workspace.Subhead3}</p>
          <form action="#" method="post">
            <Input
              id={'workspace name'}
              name={'workspace name'}
              className="p-3 w-full bg-gray100 mb-4"
              placeholder={Workspace.Name}
              onChange={handleChange}
            />
            <Collapse
              expandIconPosition={'end'}
              items={items}
              className="font-poppins border-2 border-gray500"
            />
          </form>
        </div>
      </Modal>
    </>
  );
};

export default App;
