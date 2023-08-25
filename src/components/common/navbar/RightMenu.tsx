import React from "react";
import { Menu } from "antd";

interface RightMenuProps {
  mode: "horizontal" | "vertical" | "inline" | undefined;
  className?:string,
}

const icons = [
    {src:"/assets/icons/pocket.svg"},
    {src:"/assets/icons/download.svg"},
    {src:"/assets/icons/Vector.svg"},
]

const RightMenu: React.FC<RightMenuProps> = ({ mode, className }) => {
  return (
    <Menu mode={mode} className={className}>
      {icons.map((icon) => (
        <img src={icon.src} alt="" className="w-5" />
      ))}
    </Menu>
  );
};

export default RightMenu;
