import { FC, useEffect, useState } from "react";
import { HandType, increment, Hand, Hands, incrementInitCount } from "../reducers/hands";
import { FormControlLabel, FormGroup, Grid, Input, Switch } from "@mui/material";
import { useSelector } from "react-redux";
import { store } from "../reducers/store";
import { GameCounter } from "./game-count";
import { ProbabilityCounter } from "./probability-count";
import { TitleHeader } from "./title-header";
import { HandButton } from "./hand-button";
import { AquiredCoinCounter } from "./aquired-counter";

interface HomeViewProps {

}

export enum InputMode {
  // 初期入力
  inital,
  // 通常入力
  normal,
}

export const HomeView: FC<HomeViewProps> = (props) => {
  const { } = props;

  // 役一覧
  const hands: Hands = useSelector((state: any) => state.handsState.hands)

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

  // 入力モード(初期値入力)
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.normal);

  /**
   * ボタンクリック時のハンドラ
   * @param handType 役の種類
   */
  const handleClick = (handType: HandType) => {
    store.dispatch(increment(handType));
  }

  useEffect(() => {
    const rb = hands[HandType.regularBonus];
    const bb = hands[HandType.bigBonus];
    const grape = hands[HandType.grape]
    setRegularBonusCount(rb.count);
    setBigBonusCount(bb.count);
    setGrapeCount(grape.count);
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
   * ボーナスボタンクリック時のハンドラ
   * @param bonusType ボーナス種別
   */
  const handleClickBonusButton = (bonusType: HandType) => {
    const isInitInput = inputMode === InputMode.inital;
    // 初期入力フラグが立っている場合は初期カウントをインクリメントする
    if (isInitInput) {
      store.dispatch(incrementInitCount(bonusType));
    } else {
      store.dispatch(increment(bonusType));
    }
  }

  /**
   * ボーナスボタン
   * @param bonusName ボーナス名
   * @returns DOM
   */
  const bonusButton = (bonusType: HandType.bigBonus | HandType.regularBonus) => {
    // ボーナス役
    const bonus = hands[bonusType];
    return (
      <Grid
        item
        key={bonus.id}
        xs={4}
        sx={{
          p: 1,
        }}
      >
        <HandButton
          hand={bonus}
          hasInitCaption={true}
          onClick={() => { handleClickBonusButton(bonus.id) }}
        />
      </Grid>
    )
  }

  /**
   * 子役ボタン
   * @param handType 役名
   * @returns DOM
   */
  const handButton = (handType: HandType) => {
    const hand = hands[handType];

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

  /**
   * 入力モード変更スイッチのハンドラ
   */
  const handleChangeInputModeSwitch = () => {
    if (inputMode === InputMode.inital) {
      setInputMode(InputMode.normal)
    } else if (inputMode === InputMode.normal) {
      setInputMode(InputMode.inital)
    }
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
      <AquiredCoinCounter
        gameCount={gameCount - startingGameCount}
        hands={hands}
      />
      <Grid
        container
      >
        {bonusButton(HandType.bigBonus)}
        {bonusButton(HandType.regularBonus)}
        <Grid
          item
          xs={3}
        >
          <FormGroup>
            <FormControlLabel control={
              <Switch
                onClick={handleChangeInputModeSwitch}
                color={'warning'}
                size={'small'}
              />
            }
              label={'ボーナス初期値入力'}
              labelPlacement={'top'}
            />
          </FormGroup>
        </Grid>
      </Grid>
      <ProbabilityCounter
        caption="合計確率"
        gameCount={gameCount}
        occurrence={bigBonusCount + regularBonusCount}
      />
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
      <Grid
        container
      >
        {handButton(HandType.grape)}
        {handButton(HandType.replay)}
        {handButton(HandType.cherry)}
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