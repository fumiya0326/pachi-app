import { FC, useEffect, useState } from "react";
import { hands, HandName, increment, HandState, Hand } from "../reducers/hands";
import { Box } from "./widget/box";
import { Button, Typography, Grid } from "@mui/material";
import { Header } from "./widget/header";
import { useSelector } from "react-redux";
import { store } from "../reducers/store";
import { ButtonBase, typographyClasses } from "@mui/material";
import { typography } from "@mui/system";
import { GameCounter } from "./game-count";

interface HomeViewProps {

}

export const HomeView: FC<HomeViewProps> = (props) => {
  const { } = props;

  // 役一覧
  const hands: Hand[] = useSelector((state: any) => state.handsState.hands)

  // ゲーム数
  const [gameCount, setGameCount] = useState<number>(0);

  // 開始ゲーム数
  const [startingGameCount, setStartingGameCount] = useState<number>(0);

  // RB回数
  const [regularBonusCount, setRegularBonusCount] = useState<number>(0);

  // BB回数
  const [bigBonusCount, setBigBonusCount] = useState<number>(0);

  /**
   * ボタンクリック時のハンドラ
   * @param handName 役の種類
   */
  const handleClick = (handName: HandName) => {
    store.dispatch(increment(handName));
  }

  useEffect(() => {
    const rb = hands.find(hand => hand.name === HandName.regularBonus);
    const bb = hands.find(hand => hand.name === HandName.bigBonus);
    if (rb) {
      setRegularBonusCount(rb.count);
    }
    if (bb) {
      setBigBonusCount(bb.count)
    }
  }, [hands]);

  /**
   * ゲーム数変更時のハンドラ
   * @param newGameCount ゲーム数
   */
  const handleChangeTotalGameCount = (newGameCount: number) => {
    setGameCount(newGameCount);
  }

  /**
   * 開始ゲーム数変更時のハンドラ
   * @param gameCount ゲーム数
   */
  const handleChangeStartingGameCount = (newGameCount: number) => {
    setStartingGameCount(newGameCount);
  }


  return (
    <>
      <Header title="ジャグラーカウンタ" />
      <Grid
        container
      >
        {
          hands.map((hand) => {
            return (
              <Grid
                item
                key={hand.name}
                xs={4}
              >
                <Button
                  variant='outlined'
                  onClick={() => { handleClick(hand.name) }}
                >
                  {hand.name}
                </Button>
                <Typography>
                  {hand.count}
                </Typography>
              </Grid>
            )
          })
        }
      </Grid>
      <GameCounter
        onChangeTotalGameCount={handleChangeTotalGameCount}
        onChangeStartingGameCount={handleChangeStartingGameCount}
        totalGameCount={gameCount}
        startingGameCount={startingGameCount}
      />
    </>
  )
}