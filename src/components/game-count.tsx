import { Button, TextField, Typography, Grid } from "@mui/material";
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
    const value = Number(event.target.value);
    onChangeStartingGameCount(value);
    // 総ゲーム数が開始ゲーム数を下回っている場合は開始ゲーム数で更新する
    if (totalGameCount < value) {
      onChangeTotalGameCount(value);
    }
  }

  /**
   * 総ゲーム数変更時のハンドラ
   * @param event イベント
   */
  const handleChangeTotalGameCount = (event: any) => {
    const value = Number(event.target.value);
    onChangeTotalGameCount(value)
  }

  /**
   * 増加ボタン
   * @param value 増分の値
   * @returns DOM
   */
  const incrementButton = (value: number) => {

    const onClick = () => {
      const newValue = value + Number(totalGameCount);
      onChangeTotalGameCount(newValue);
    }

    return (
      <Button
        onClick={onClick}
        variant="contained"
        sx={{
          width: '40px',
          height: "40px",
          borderRadius: 2,
          m: 1,
        }}
      >
        {`+${value}`}
      </Button>
    );
  }

  return (
    <Box
      sx={{
        m: 1
      }}
    >
      <Grid
        container
        sx={{
          m: 1,
        }}
      >
        <Grid
          item
          xs={3}
        >
          <Typography>
            開始ゲーム
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
        >
          <TextField
            sx={{
              ml: 1,
              background: '#EEE',
              width: '80px',
              borderRadius: 2,
            }}
            type="number"
            variant='standard'
            value={startingGameCount.toString()}
            onChange={handleChangeStartingGameCount}
          />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          m: 1,
        }}
      >
        <Grid
          item
          xs={3}
        >
          <Typography>
            総ゲーム
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
        >

          <TextField
            sx={{
              ml: 1,
              background: '#EEE',
              borderRadius: 2,
              width: '80px'
            }}
            type="number"
            variant='standard'
            value={totalGameCount.toString()}
            onChange={handleChangeTotalGameCount}
          />
        </Grid>
        <Grid
          container
        >
          <Grid
            item
            xs={3}
          />
          <Grid
            item
            xs={9}
          >
            {incrementButton(1)}
            {incrementButton(10)}
            {incrementButton(100)}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}