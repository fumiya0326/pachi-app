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
        height: '100px',
        display: 'block',
      }}
      color={hand.color}
      fullWidth
      onClick={() => {onClick(hand.name)}}
    >
      <Typography>
          {hand.name}
      </Typography>
      <Typography
        variant="h4"
      >
        {hand.count}
      </Typography>
    </Button>
  )
}