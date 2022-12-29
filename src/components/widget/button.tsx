import { ButtonBase } from "@mui/material";
import { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button: FC<ButtonProps> = (props) => {
  const { children, onClick } = props;

  return (
    <button
      onClick={onClick}
    >
      {children}
    </button>
    
  )
}