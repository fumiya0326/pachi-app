import { FC } from "react";
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { Button } from "@mui/material";
import { InputMode } from "./home-view";

interface MinusButtonProps {
  // 入力モード
  inputMode: InputMode;
  // 入力モード
  onClick: () => void;
}

export const MinusButton: FC<MinusButtonProps> = (props) => {
  const { inputMode, onClick } = props;

  const buttonColor = inputMode === InputMode.decrement ? "#660000" : "#e60012";

  return (
    <Button
      onClick={onClick}
    >
      <IndeterminateCheckBoxIcon
        sx={{
          color: buttonColor,
          width: '45px',
          height: '45px',
        }}
      />
    </Button>
  )
}