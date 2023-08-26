import React, { ReactNode } from "react";
import { Button } from "antd";

interface ButtonProps {
  icon?: ReactNode;
  name?: string;
  className?: string;
  size:"small" | "middle" | "large";
  type: "link" | "text" | "default" | "primary" | "dashed"; 
  shape:"default" | "circle" | "round" | undefined;
  href?:string
}

const button: React.FC<ButtonProps> = ({ icon, name, className, size, type, shape, href}) => (
  <Button className={className} icon={icon} size={size} type={type} shape={shape} href={href} >
    {name}
  </Button>
);

export default button;
