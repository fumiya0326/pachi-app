import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * 役名一覧
 */
export enum HandType {
  bigBonus = 'bigBonus',
  regularBonus = 'regularBonus',
  grape = 'grape',
  cherry = 'cherry',
  replay = 'replay',
}

/**
 * 役
 */
export interface Hand {
  id: HandType,
  description: string;
  initCount?: number;
  count: number;
  color: "error" | "secondary" | "success" | "warning" | "inherit" | "primary" | "info" | undefined,
}

export type Hands = { [name: string]: Hand }

/**
 * 役のState
 */
export interface HandState {
  hands: Hands,
}

/// initial state
const initialState: HandState = {
  hands: {
    bigBonus: { id: HandType.bigBonus, description: "BB", initCount: 0, count: 0, color: 'error' },
    regularBonus: { id: HandType.regularBonus, description: "RB", initCount: 0, count: 0, color: 'secondary' },
    grape: { id: HandType.grape, description: "ぶどう", count: 0, color: 'success' },
    replay: { id: HandType.replay, description: "リプレイ", count: 0, color: 'warning' },
    cherry: { id: HandType.cherry, description: "チェリー", count: 0, color: 'error' },
  }
}

const slice = createSlice({
  name: 'hands',
  initialState,
  reducers: {
    /**
     * update hands
     * @param state hand state 
     * @param action hands payload action
     */
    update: (state: HandState, action: PayloadAction<Hands>) => {
      const _hands = action.payload;
      state.hands = {
        ...state.hands,
        ..._hands,
      }
    },
    /**
     * カウントをインクリメントする
     * @param state state
     * @param action 役の種別のペイロードアクション
     */
    increment: (state: HandState, action: PayloadAction<HandType>) => {
      const _handType = action.payload;
      state.hands[_handType].count += 1;
    },
    /**
     * 初期カウントをインクリメントする
     * @param state state
     * @param action 役の種別のペイロードアクション
     */
    incrementInitCount: (state: HandState, action: PayloadAction<HandType>) => {
      const _handType = action.payload;
      const _hand = state.hands[_handType];

      // 初期カウントが定義されていない場合は処理を行わない
      if (_hand.initCount === undefined) {
        _hand.count += 1;
        return;
      }

      _hand.initCount += 1;

      // もし初期カウントがカウントを上回っている場合はカウントを増加させる
      if (_hand.initCount > _hand.count) {
        _hand.count += 1;
      }
    },
    /**
     * カウントをデクリメントする
     * @param state state
     * @param action 役の種別のペイロードアクション
     */
    decrement: (state: HandState, action: PayloadAction<HandType>) => {
      const _handType = action.payload;
      const hand = state.hands[_handType];
      if (hand.count > 0) {
        hand.count -= 1;
      }
    },
    /**
     * 初期値でリセット
     * @param state state
     */
    reset: (state: HandState) => {
      let _hands = state.hands;

      _hands['bigBonus'] = initialState.hands['bigBonus'];
      _hands['regularBonus'] = initialState.hands['regularBonus'];
      _hands['grape'] = initialState.hands['grape'];
      _hands['replay'] = initialState.hands['replay'];
      _hands['cherry'] = initialState.hands['cherry'];
    }
  }
});

/**
 * カウントをインクリメントする
 * @param handType 役の種別
 */
export const increment = (handType: HandType) => (dispatch: any) => {
  dispatch(slice.actions.increment(handType))
}

/**
 * 初期カウントをインクリメントする
 * @param handType 役の種別
 */
export const incrementInitCount = (handType: HandType) => (dispatch: any) => {
  dispatch(slice.actions.incrementInitCount(handType));
}

/**
 * カウントをデクリメントする
 * @param handType 役の種別
 */
export const decrement = (handType: HandType) => (dispatch: any) => {
  dispatch(slice.actions.decrement(handType));
}

/**
 * 役をリセットする
 */
export const reset = () => (dispatch: any) => {
  dispatch(slice.actions.reset());
}

export const hands = (state: any): any => { return state.handsState };

export default slice.reducer;