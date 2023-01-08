import { Button } from "@mui/material";
import { FC } from "react";
import { InputMode } from "./home-view";
import AutorenewIcon from '@mui/icons-material/Autorenew';

interface InitInputModeButtonProps {
  inputMode: InputMode;
  onClick: () => void;
}

export const InitInputModeButton: FC<InitInputModeButtonProps> = (props) => {
  const { inputMode, onClick } = props;

  const caption = inputMode === InputMode.inital ? '通常入力' : 'ボーナス初期値入力'
  return (
    <Button
      variant='contained'
      sx={{
        width: '200px',
      }}
      onClick={onClick}
    >
      <AutorenewIcon/>
      {caption}
    </Button>
  );
}