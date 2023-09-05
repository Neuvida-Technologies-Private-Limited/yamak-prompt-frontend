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
  const llmChangeHandler = () => {};
  const skChangeHandler = () => {};

  return (
    <>
      <Button
        size={'middle'}
        type={'default'}
        shape={'default'}
        onClick={addKeyButtonHandler}
        name="Add key"
        className="bg-primary text-white hover:!text-white border-none font-poppins hover:bg-hoverPrimary"
      />
      <Modal
        title={KeyManagement.Title}
        centered
        open={showModal}
        onOk={() => setShowModal(true)}
        onCancel={() => setShowModal(false)}
        okText={KeyManagement.Ok}
        cancelText={KeyManagement.Cancel}
        className="font-poppins flex flex-start"
      >
        <div className="flex flex-col">
          <p className="text-gray400 pb-3">{KeyManagement.SubHead}</p>
          <form action="#" method="post">
            <div className="mt-5">
              <Input
                id={KeyManagement.KeyTitle}
                name={KeyManagement.KeyTitle}
                className="p-3 w-full bg-gray100 mb-4"
                placeholder={KeyManagement.TitlePlaceholder}
                onChange={titleChangeHandler}
              />
              <Input
                id={KeyManagement.LLMTitle}
                name={KeyManagement.LLMTitle}
                className="p-3 w-full bg-gray100 mb-4"
                placeholder={KeyManagement.LLMPlaceholder}
                onChange={llmChangeHandler}
              />
              <Input
                id={KeyManagement.SKTitle}
                name={KeyManagement.SKTitle}
                className="p-3 w-full bg-gray100 mb-4"
                placeholder={KeyManagement.SKPlaceholder}
                onChange={skChangeHandler}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default App;
