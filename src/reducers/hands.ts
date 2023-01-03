import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Reducer } from 'react';
import { Action } from 'redux'

/**
 * 役名一覧
 */
export enum HandName {
  bigBonus = 'BB',
  regularBonus = 'RB',
  grape = 'ぶどう',
  cherry = 'チェリー',
  replay = 'リプレイ',
  pierrot = 'ピエロ',
  bell = 'ベル',
  bar = 'BAR',
}

/**
 * 役
 */
export interface Hand {
  id: string,
  name: HandName;
  count: number;
  color: "error" | "secondary" | "success" | "warning" | "inherit" | "primary" | "info" | undefined,
}

/**
 * 役のState
 */
export interface HandState {
  hands: Hand[],
}

/// initial state
const initialState: HandState = {
  hands: [
    { id: 'bigBonus',name: HandName.bigBonus, count: 0 , color: 'error'},
    { id: 'regularBonus',name: HandName.regularBonus, count: 0 , color: 'secondary'},
    { id: 'grape',name: HandName.grape, count: 0 , color: 'success'},
    { id: 'replay',name: HandName.replay, count: 0 , color: 'warning'},
    { id: 'cherry',name: HandName.cherry, count: 0 , color: 'error'},
    // { id: 'bell',name: HandName.bell, count: 0 , color: '#EEE'},
    // { id: 'pierrot',name: HandName.pierrot, count: 0 , color: '#EEE'},
    // { id: 'bar',name: HandName.bar, count: 0 , color: '#EEE'},
  ]
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
    update: (state: HandState, action: PayloadAction<Hand[]>) => {
      const _hands = action.payload;
      state.hands = [
        ...state.hands,
        ..._hands,
      ]
    },
    /**
     * increment hand count
     * @param state hand state
     * @param action hand name payload action
     */
    increment: (state: HandState, action: PayloadAction<HandName>) => {
      const _handName = action.payload;
      const index = state.hands.findIndex(hand => hand.name === _handName);
      state.hands[index].count += 1;
    }
  }
});

/**
 * increment hand counter
 * @param handName hand name
 */
export const increment = (handName: HandName) => (dispatch: any) => {
  dispatch(slice.actions.increment(handName))
}

export const hands = (state: any): any => { return state.handsState };

export default slice.reducer;