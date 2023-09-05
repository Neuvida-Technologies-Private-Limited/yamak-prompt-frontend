import React, { useState } from 'react';
import { Button, Input } from 'components/common';
import { Modal } from 'antd';
import { KeyManagement } from 'utils/constants';

const App = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const addKeyButtonHandler = () => {
    setShowModal(prev => !prev);
  };

  const titleChangeHandler = () => {};
  const LLMChangeHandler = () => {};
  const SkChangeHandler = () => {};

  return (
    <>
      <Button
        size={'middle'}
        type={'default'}
        shape={'default'}
        onClick={addKeyButtonHandler}
        name="Add key"
        className="bg-primary text-white font-bold border-none"
      />
      <Modal
        title={KeyManagement.Title}
        centered
        open={showModal}
        onOk={() => setShowModal(true)}
        onCancel={() => setShowModal(false)}
        okText={KeyManagement.Ok}
        className="font-poppins flex flex-start"
      >
        <div className="flex flex-col">
          <p className="text-gray400 pb-3">{KeyManagement.SubHead}</p>
          <form action="#" method="post">
            <div className="mt-5">
              <Input
                id={KeyManagement.Input1Id}
                name={KeyManagement.Input1Name}
                className="p-3 w-full bg-gray100 mb-4"
                placeholder={KeyManagement.Input1Placeholder}
                onChange={titleChangeHandler}
              />
              <Input
                id={KeyManagement.Input2Id}
                name={KeyManagement.Input2Name}
                className="p-3 w-full bg-gray100 mb-4"
                placeholder={KeyManagement.Input2Placeholder}
                onChange={LLMChangeHandler}
              />
              <Input
                id={KeyManagement.Input3Id}
                name={KeyManagement.Input3Name}
                className="p-3 w-full bg-gray100 mb-4"
                placeholder={KeyManagement.Input3Placeholder}
                onChange={SkChangeHandler}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default App;
