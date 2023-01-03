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
import { ProbabilityCounter } from "./probability-count";
import { TitleHeader } from "./title-header";
import { HandButton } from "./hand-button";

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

  // ぶどう回数
  const [grapeCount, setGrapeCount] = useState<number>(0);

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
    const grape = hands.find(hand => hand.name === HandName.grape);
    if (rb) {
      setRegularBonusCount(rb.count);
    }
    if (bb) {
      setBigBonusCount(bb.count);
    }
    if (grape) {
      setGrapeCount(grape.count);
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

  /**
   * 一覧から役を取得
   * @param handName 役名
   * @returns 役
   */
  const handButton = (handName: HandName) => {
    const hand = hands.find(hand => hand.name === handName);

    if (!hand) return;

    return (
      <Grid
        item
        key={hand.id}
        xs={4}
        sx={{
          p: 1,
        }}
      >
        <HandButton
          hand={hand}
          onClick={handleClick}
        />
      </Grid>
    )
  }

  return (
    <>
      <TitleHeader
        title="ジャグラー設定判別ツール"
      />
      <GameCounter
        onChangeTotalGameCount={handleChangeTotalGameCount}
        onChangeStartingGameCount={handleChangeStartingGameCount}
        totalGameCount={gameCount}
        startingGameCount={startingGameCount}
      />
      <Grid
        container
      >
        {handButton(HandName.bigBonus)}
        {handButton(HandName.regularBonus)}
      </Grid>
      <ProbabilityCounter
        caption="RB確率"
        gameCount={gameCount}
        occurrence={regularBonusCount}
      />
      <ProbabilityCounter
        caption="BB確率"
        gameCount={gameCount}
        occurrence={bigBonusCount}
      />
      <ProbabilityCounter
        caption="合計確率"
        gameCount={gameCount}
        occurrence={bigBonusCount + regularBonusCount}
      />
      <Grid
        container
      >
        {handButton(HandName.grape)}
        {handButton(HandName.replay)}
        {handButton(HandName.cherry)}
      </Grid>
      <ProbabilityCounter
        caption="ブドウ確率"
        gameCount={gameCount - startingGameCount}
        occurrence={grapeCount}
        significantDigit={2}
      />
    </>
  )
}