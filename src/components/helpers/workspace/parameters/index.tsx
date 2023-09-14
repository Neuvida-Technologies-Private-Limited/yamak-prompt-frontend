import React, { useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import { Button, Input, Tooltip, Modal, Slider } from 'components/common';
import { Workspace, InputVariants } from 'utils/constants';
import { Types } from './types';

const handleChange = () => {};

const sliderChange = (value: number) => {};

const parameters: Types[] = [
  {
    label: 'Temperature',
    input: <Slider onValueChange={sliderChange} />,
    title: 'Temperature Info',
  },
  {
    label: 'Maximum Length',
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
        className="!w-2/3"
        variant={InputVariants.Filled}
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
        className="!w-2/3"
        variant={InputVariants.Filled}
      />
    ),
    title: 'Logit Bias Info',
  },
];

const Parameters: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        type="default"
        onClick={() => setShowModal(true)}
        size={'middle'}
        shape={undefined}
        name={Workspace.Parameters}
        className="parameters border-none px-6 font-poppins hover:!text-primary800 text-primary underline"
      />
      <Modal
        title={Workspace.Parameters}
        centered={true}
        isOpen={showModal}
        showModalHandler={() => setShowModal(true)}
        cancelModalHandler={() => setShowModal(false)}
        okText={Workspace.Parameters}
        className="parameters !w-1/2"
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
