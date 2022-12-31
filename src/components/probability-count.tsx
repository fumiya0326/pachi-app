import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

interface ProbabilityCounterProps {
  // ゲーム数
  gameCount: number;
  // キャプション
  caption: string;
  // 対象の出現回数
  occurrence: number;
  // 有効桁数
  significantDigit?: number | 0;
}

export const ProbabilityCounter: FC<ProbabilityCounterProps> = (props) => {

  const {
    gameCount,
    caption,
    occurrence,
    significantDigit,
  } = props;

  /**
   * 1/確率分母　形式の確率
   */
  const probability = (() => {
    if (gameCount && occurrence) {
      return `1/${(gameCount / occurrence).toFixed(significantDigit)}`;
    }
    return `1/-`;
  })();

  return (
    <Box
      display='flex'
    >
      <Typography
        width="100px"
      >
        {caption}
      </Typography>
      <Typography
        width="10px"
      >
        :
      </Typography>
      <Typography
        fontWeight="bold"
        fontSize="20px"
      >
        {probability}
      </Typography>
    </Box>
  )
}