import React, { useState } from 'react';
import { FiInfo, FiSliders } from 'react-icons/fi';
import { Button, Input, Tooltip, Modal, Slider } from 'components/common';
import { Workspace, InputVariants, ButtonVariants } from 'utils/constants';
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
      {/* Button visible in tab and desktop view */}
      <Button
        onClick={() => setShowModal(true)}
        size={'middle'}
        variant={ButtonVariants.PRIMARY_LINK}
        type="text"
        name={Workspace.Parameters}
        className="md:flex sm:hidden"
      />
      {/* Button visible in mobile view */}
      <Button
        onClick={() => setShowModal(true)}
        size={'middle'}
        variant={ButtonVariants.OUTLINED_LIGHT}
        icon={<FiSliders />}
        className="sm:flex md:!hidden"
      />
      <Modal
        title={Workspace.Parameters}
        centered={true}
        isOpen={showModal}
        sumbitHandler={() => setShowModal(true)}
        cancelModalHandler={() => setShowModal(false)}
        okText={Workspace.AddPrompt}
        className="parameters em:!w-1/2 sm:!w-full"
      >
        <div className="flex flex-col">
          <form action="#" method="post">
            <div className="flex w-full flex-col">
              {parameters.map((items, index) => (
                <div
                  key={`parameter-item-${index}`}
                  className="flex sm:!flex-wrap"
                >
                  <div className="em:w-1/3 sm:w-full flex items-center">
                    <label className="p-3">{items.label}</label>
                    <Tooltip element={<FiInfo />} title={items.title} />
                  </div>
                  <div className="em:w-2/3 sm:w-full">{items.input}</div>
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
