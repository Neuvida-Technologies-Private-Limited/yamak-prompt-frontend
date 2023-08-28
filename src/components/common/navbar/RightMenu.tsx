import React from "react";
import { Menu } from "antd";
import {IconPaths} from "../../../utils/constants"

interface RightMenuProps {
  mode: "horizontal" | "vertical" | "inline" | undefined;
  className?:string,
}

const icons = [
    {src: IconPaths.POCKET },
    {src: IconPaths.DOWNLOAD},
    {src: IconPaths.VECTOR},
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
