import React, { ReactNode } from "react";
import { Button } from "antd";

interface ButtonProps {
  icon?: ReactNode;
  name?: string;
  className?:string;
}

const button: React.FC<ButtonProps> = ({ icon, name, className }) => (
  <Button className={className} icon={icon}>
    {name}
  </Button>
);

export default button;
