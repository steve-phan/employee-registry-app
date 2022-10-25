import { Button } from "antd";
import React from "react";

interface IButtonWithIconProps {
  children: JSX.Element | string;
  icon: JSX.Element;
  onClick: () => void;
}

export const ButtonWithIcon = ({
  children,
  icon,
  onClick,
}: IButtonWithIconProps) => {
  return (
    <Button
      type="default"
      style={{
        textAlign: "left",
        marginBottom: "8px",
        border: "none",
      }}
      block
      icon={icon}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
