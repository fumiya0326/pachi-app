import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import { Hands, HandType } from "../reducers/hands";

interface AquiredCoinCounterProps {
  gameCount: number;
  hands: Hands;
}

export const AquiredCoinCounter: FC<AquiredCoinCounterProps> = (props) => {
  const {
    gameCount,
    hands,
  } = props;

  const regularBonus = hands[HandType.regularBonus];
  const bigBonus = hands[HandType.bigBonus];
  const grape = hands[HandType.grape];
  const cherry = hands[HandType.cherry];
  const replay = hands[HandType.replay];

  const regularBonusCoinCount = (regularBonus.count - (regularBonus.initCount as number)) * 96;
  const bigBonusCoinCount = (bigBonus.count - (bigBonus.initCount as number)) * 240;
  const grapeCoinCount = grape.count * 8;
  const cherryCoinCount = cherry.count * 2;
  const replayCoinCount = replay.count * 3;

  const gameCoinCount = gameCount * 3;

  // 獲得枚数
  const aquiredCount = regularBonusCoinCount + bigBonusCoinCount + grapeCoinCount + replayCoinCount + cherryCoinCount - gameCoinCount;

  return (
    <Box
      display='flex'
    >
      <Typography
        fontWeight="bold"
        fontSize="20px"
      >
        {aquiredCount}枚
      </Typography>
    </Box>
  );
}