import React from "react";
import { CardConst } from "../../../utils/constants";
import {
  CopyOutlined,
  DislikeOutlined,
  HeartOutlined,
  LikeOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button } from "../../common";

interface CardProps {
  heading: string;
  subHeading: string;
}
const buttons = [
  { icon: <CopyOutlined />, name: CardConst.CopyPrompt },
  { icon: <LikeOutlined />, name: CardConst.Likes },
  { icon: <DislikeOutlined />, name: CardConst.Likes },
  { icon: <HeartOutlined /> },
  { icon: <WarningOutlined /> },
];

const index: React.FC<CardProps> = ({ heading, subHeading }) => {
  return (
    <div className="flex flex-col bg-bgSecondary w-1/3 p-5 rounded-2xl">
      <div className="font-poppins font-bold text-md pb-3">{heading}</div>
      <div className="font-raleway font-normal text-xs pb-3">{subHeading}</div>
      <div className="flex justify-between"> 
        {buttons.map((button) => (
          <Button
            size={undefined}
            type={"default"}
            shape={undefined}
            icon={button.icon}
            name={button.name}
            className="flex items-center text-xs justify-center font-raleway"
          />
        ))}
      </div>
    </div>
  );
};

export default index;
