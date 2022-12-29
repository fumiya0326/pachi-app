import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Reducer } from 'react';
import { Action } from 'redux'

/**
 * 役名一覧
 */
export enum HandName {
  bigBonus = 'bigBonus',
  regularBonus = 'regularBonus',
  grape = 'grape',
  cherry = 'cherry',
  replay = 'replay',
  pierrot = 'pierrot',
  bell = 'bell',
  bar = 'bar',
}

/**
 * 役
 */
export interface Hand {
  name: HandName;
  count: number;
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
    { name: HandName.cherry, count: 0 },
    { name: HandName.bell, count: 0 },
    { name: HandName.bigBonus, count: 0 },
    { name: HandName.regularBonus, count: 0 },
    { name: HandName.bar, count: 0 },
    { name: HandName.pierrot, count: 0 },
    { name: HandName.replay, count: 0 },
    { name: HandName.grape, count: 0 },
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