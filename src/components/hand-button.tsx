import { Button, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Hand, HandType } from "../reducers/hands";

interface HandButtonProps {
  // 役
  hand: Hand;
  // クリック通知
  onClick: (handType: HandType) => void;
  // 初期キャプションのフラグ
  hasInitCaption?: boolean;
}

export const HandButton: FC<HandButtonProps> = (props) => {

  const {
    hand,
    onClick,
    hasInitCaption,
  } = props;

  // カウントのキャプション
  const [countCaption, setCountCaption] = useState<string>();

  useEffect(() => {
    if (hasInitCaption) {
      setCountCaption(`${hand.initCount}→${hand.count}`);
    } else {
      setCountCaption(`${hand.count}`)
    }
  }, [hasInitCaption, hand]);

  return (
    <Button
      variant="contained"
      sx={{
        height: '100px',
        display: 'block',
      }}
      color={hand.color}
      fullWidth
      onClick={() => { onClick(hand.id) }}
    >
      <Typography>
        {hand.description}
      </Typography>
      <Typography
        variant="h6"
      >
        {countCaption}
      </Typography>
    </Button>
  )
}