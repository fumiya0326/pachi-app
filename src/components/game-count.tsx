import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

interface GameCounterProps {
  // ゲーム数変更通知
  onChange: (value: number) => void;
  // ゲーム回数
  gameCount: number;
  // BB回数
  bigBonusCount: number;
  // RB回数
  regularBonusCount: number;
  
}

export const GameCounter: FC<GameCounterProps> = (props) => {
  const {
    gameCount,
    bigBonusCount,
    regularBonusCount,
    onChange,
  } = props;

  // RB確率
  const rbProbability = (() => {
    if (gameCount && regularBonusCount) {
      return `1/${(gameCount/regularBonusCount).toFixed(0)}`
    } 
    return '1/-';
  })()
  // BB確率
  const bbProbability = (gameCount / bigBonusCount).toFixed(0)
  // 合算確率
  const combinedProbability = (gameCount / (bigBonusCount + regularBonusCount)).toFixed(0);

  const gameCountButton = (gameCount: number) => {
    return (
      <Button
        variant="outlined"
        onClick={() => onChange(gameCount)}
      >
        {gameCount}
      </Button>
    )
  }

  return (
    <Box
      sx={{
        border: '1px solid #EEE'
      }}
    >
      <Typography>
        ゲーム数: {gameCount}
      </Typography>
      <Typography>
        RB確率: {rbProbability}
      </Typography>
      <Typography>
        BB確率: 1/{bbProbability}
      </Typography>
      <Typography>
        合算確率: 1/{combinedProbability}
      </Typography>
      <Typography>
        ぶどう確率: 1/
        </Typography>
      {gameCountButton(1000)}
      {gameCountButton(100)}
      {gameCountButton(10)}
      <br />
      {gameCountButton(-1000)}
      {gameCountButton(-100)}
      {gameCountButton(-10)}
    </Box>
  )a
}