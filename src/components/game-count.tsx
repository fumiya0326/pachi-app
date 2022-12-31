import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

interface GameCounterProps {
  // ゲーム数変更通知
  onChangeTotalGameCount: (value: number) => void;
  // 開始ゲーム数変更通知
  onChangeStartingGameCount: (value: number) => void;
  // ゲーム回数
  totalGameCount: number;
  // 開始ゲーム数
  startingGameCount: number;
}

// ゲーム回数入力
export const GameCounter: FC<GameCounterProps> = (props) => {
  const {
    totalGameCount,
    startingGameCount,
    onChangeTotalGameCount,
    onChangeStartingGameCount,
  } = props;

  /**
   * 開始ゲーム数変更時のハンドラ
   * @param event イベント
   */
  const handleChangeStartingGameCount = (event: any) => {
    const value = event.target.value as number;
    onChangeStartingGameCount(value);
  }

  /**
   * 総ゲーム数変更時のハンドラ
   * @param event イベント
   */
  const handleChangeTotalGameCount = (event: any) => {
    const value = event.target.value as number;
    onChangeTotalGameCount(value)
  }

  return (
    <Box
      sx={{
        border: '1px solid #EEE'
      }}
    >
      <Box
        display='flex'
      >
        <Typography>
          開始ゲーム数 
        </Typography>
        <TextField
          sx={{
            background: '#EEE'
          }}
          type="number"
          variant='standard'
          value={startingGameCount}
          onChange={handleChangeStartingGameCount}
        />
      </Box>
      <Box
        display='flex'
      >
        <Typography>
          合計ゲーム数 
        </Typography>
        <TextField
          sx={{
            background: '#EEE'
          }}
          type="number"
          variant='standard'
          value={totalGameCount}
          onChange={handleChangeTotalGameCount}
        />
      </Box>
    </Box>
  );
}