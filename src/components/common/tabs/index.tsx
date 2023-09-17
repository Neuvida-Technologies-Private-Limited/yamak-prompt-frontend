import { useState } from 'react';
import { Button } from 'components/common';

interface TabProps {
  tab1: string;
  tab2: string;
  icon1: React.ReactNode;
  icon2: React.ReactNode;
  className?: string;
}

const Index: React.FC<TabProps> = ({ tab1, tab2, icon1, icon2, className }) => {
  const [isSelected, setIsSelected] = useState(true);

  const filterHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsSelected(event.currentTarget.textContent === tab1 ? true : false);
  };

  return (
    <div className={`flex ${className}`}>
      <div className="flex bg-gray50 rounded-2xl p-2">
        <Button
          size="small"
          type="default"
          shape="default"
          onClick={filterHandler}
          className={`${
            isSelected && 'bg-white'
          } rounded-2xl font-medium !py-4 !px-3 border-0`}
          name={tab1}
          icon={icon1}
        />
        <Button
          size="small"
          type="default"
          shape="default"
          onClick={filterHandler}
          className={`${
            !isSelected && 'bg-white'
          } font-medium rounded-2xl !py-4 !px-3 border-0`}
          name={tab2}
          icon={icon2}
        />
      </div>
    </div>
  );
};

export default Index;
