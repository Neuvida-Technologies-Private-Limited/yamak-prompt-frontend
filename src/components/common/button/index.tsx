import React, { ReactNode } from "react";
import { Button } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

interface ButtonProps {
  icon?: ReactNode;
  name?: string;
  className?: string;
  color?: string;
  size:SizeType;
  type: "link" | "text" | "default" | "primary" | "dashed"; 
  shape:"default" | "circle" | "round" | undefined;
  href?:string
}

const button: React.FC<ButtonProps> = ({ icon, name, className, color, size, type, shape, href}) => (
  <Button className={className} icon={icon} color={color} size={size} type={type} shape={shape} href={href} >
    {name}
  </Button>
);

export default button;
