import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Reducer } from 'react';
import { Action } from 'redux'

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
  initCount: number;
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
    grape: { id: HandType.grape, description: "ぶどう", initCount: 0, count: 0, color: 'success' },
    replay: { id: HandType.replay, description: "リプレイ", initCount: 0, count: 0, color: 'warning' },
    cherry: { id: HandType.cherry, description: "チェリー", initCount: 0, count: 0, color: 'error' },
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
      _hand.initCount += 1;
      if (_hand.initCount > _hand.count) {
        _hand.count += 1;
      }
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

export const hands = (state: any): any => { return state.handsState };

export default slice.reducer;