import React from 'react';
import { Dropdown, MenuProps } from 'antd';

interface DropdownProps {
  items: MenuProps['items'];
  children: React.ReactNode | any;
  className?: string;
}

const index: React.FC<DropdownProps> = ({ items, children, className }) => {
  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      placement="bottom"
      className={className}
    >
      <button role="link" onClick={e => e.preventDefault()}>
        {children}
      </button>
    </Dropdown>
  );
};

export default index;
