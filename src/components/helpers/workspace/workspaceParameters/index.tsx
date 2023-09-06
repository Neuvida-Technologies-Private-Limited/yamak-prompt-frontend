import React, { useState } from 'react';
import { Modal } from 'antd';
import { Button, Input, Tooltip } from 'components/common';
import { Workspace } from 'utils/constants';
import { FiInfo } from 'react-icons/fi';
import Slider from './slider';
import { ParameterTypes } from './paraTypes';

const Parameters: React.FC = () => {
  const [modal1Open, setModal1Open] = useState(false);

  const handleChange = () => {};

  const sliderChange = (value: number) => {};

  const parameters: ParameterTypes[] = [
    {
      label: 'Temperature',
      input: <Slider onValueChange={sliderChange} />,
      title: 'Temperature Info',
    },
    {
      label: 'Meximum Length',
      input: <Slider onValueChange={sliderChange} />,
      title: 'Max Length Info',
    },
    {
      label: 'Stop Sequences',
      input: (
        <Input
          id={''}
          name={''}
          placeholder={'0'}
          onChange={handleChange}
          className="p-2 w-2/3"
        />
      ),
      title: 'Sequences Info',
    },
    {
      label: 'Top P',
      input: <Slider onValueChange={sliderChange} />,
      title: 'Top Info',
    },
    {
      label: 'Frequency Penalty',
      input: <Slider onValueChange={sliderChange} />,
      title: 'Frequency Penalty Info',
    },
    {
      label: 'Presence Penalty',
      input: <Slider onValueChange={sliderChange} />,
      title: 'Presence Penalty Info',
    },
    {
      label: 'Logit Bias',
      input: (
        <Input
          id={''}
          name={''}
          placeholder={'0'}
          onChange={handleChange}
          className="p-2 w-2/3"
        />
      ),
      title: 'Logit Bias Info',
    },
  ];

  return (
    <>
      <Button
        type="default"
        onClick={() => setModal1Open(true)}
        size={'middle'}
        shape={undefined}
        name={Workspace.Parameters}
        className="parameters border-gray200 px-6 font-poppins"
      />
      <Modal
        title={Workspace.Parameters}
        centered
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        okText={'Start the key'}
        className="parameters font-poppins flex !w-1/2"
      >
        <div className="flex flex-col">
          <form action="#" method="post">
            <div className="flex w-full flex-col">
              {parameters.map(items => (
                <div className="flex">
                  <div className="w-1/3 flex items-center">
                    <label className="p-3">{items.label}</label>
                    <Tooltip element={<FiInfo />} title={items.title} />
                  </div>
                  <div className="w-2/3">{items.input}</div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Parameters;
