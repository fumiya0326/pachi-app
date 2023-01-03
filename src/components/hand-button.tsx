import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { Hand, HandName } from "../reducers/hands";

interface HandButtonProps {
  // 役
  hand: Hand;
  // クリック通知
  onClick: (handName: HandName) => void;
}

export const HandButton: FC<HandButtonProps> = (props) => {

  const { hand, onClick } = props;

  return (
    <Button
      variant="contained"
      sx={{
        width: '130px',
        height: '50px',
        display: 'block',
        m:1
      }}
      onClick={() => {onClick(hand.name)}}
    >
      <Typography>
          {hand.name}
      </Typography>
      <Typography
        variant="body1"
      >
        {hand.count}
      </Typography>
    </Button>
  )
}