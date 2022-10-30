import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IKeys, ICells } from "../Service/Interfaces";

export interface KeyState {
  letterPositon: number;
  enteredKeys: number;
  cells: ICells[][];
  activeCells: ICells[];
  activeRow: number;
  keys: IKeys[];
  isGameEnded: boolean;
  isWon: boolean;
  rightLetters: number;
}
interface useKey {
  givenKey: string;
}

const initialState: KeyState = {
  letterPositon: 0,
  enteredKeys: 0,
  rightLetters: 0,
  isGameEnded: false,
  isWon: false,
  cells: [
    [
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
    ],
    [
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
    ],
    [
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
    ],
    [
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
    ],
    [
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
      { key: "", isRight: false, isWrongPlace: false },
    ],
  ],
  activeRow: 0,
  activeCells: [
    { key: "", isRight: false, isWrongPlace: false },
    { key: "", isRight: false, isWrongPlace: false },
    { key: "", isRight: false, isWrongPlace: false },
    { key: "", isRight: false, isWrongPlace: false },
    { key: "", isRight: false, isWrongPlace: false },
  ],
  keys: [
    { key: "q", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "w", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "e", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "r", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "t", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "y", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "u", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "i", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "o", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "p", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "a", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "s", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "d", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "f", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "g", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "h", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "j", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "k", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "l", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "z", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "x", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "c", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "v", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "b", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "n", isRight: false, isUsed: false, isWrongPlace: false },
    { key: "m", isRight: false, isUsed: false, isWrongPlace: false },
  ],
};

export const keySlice = createSlice({
  name: "key",
  initialState,
  reducers: {
    handleUseKey: (state, action: PayloadAction<string>) => {
      if (state.letterPositon <= 4) {
        // state.keys = state.keys.map((el) =>
        //   el.key === action.payload ? { ...el, isUsed: true } : el
        // );
        //TODO : check letters in accept handler
        state.activeCells[state.letterPositon]["key"] = action.payload;
        state.letterPositon = state.letterPositon + 1;
        state.enteredKeys = state.enteredKeys + 1;
      } else {
        alert("enough letters!");
      }
    },
    handleBack: (state) => {
      if (state.letterPositon >= 1) {
        state.letterPositon = state.letterPositon - 1;
        state.keys = state.keys.map((el) =>
          el.key === state.activeCells[state.letterPositon]["key"]
            ? { ...el, isUsed: false }
            : el
        );
        state.activeCells = state.activeCells.map((el, index) =>
          index === state.letterPositon ? { ...el, key: "" } : el
        );
        state.enteredKeys = state.enteredKeys - 1;
      } else {
        alert("not enough letters!");
      }
    },
    handleAccept: (state, action: PayloadAction<string>) => {
      state.rightLetters = 0;
      if (!state.isGameEnded) {
        // margining the activeCell to overall cells and checking letters
        state.cells[state.activeRow] = state.activeCells.map((cell, index) => {
          // check if letter is in right place
          if (cell.key === action.payload.charAt(index)) {
            const newKey = state.keys.find((key) =>
              key.key === cell.key ? key : ""
            );
            state.keys = state.keys.map((key) =>
              key.key === newKey?.key
                ? { ...key, isRight: true, isWrongPlace: false, isUsed: false }
                : key
            );
            return { ...cell, isRight: true };
            //if letter is in the word
          } else if (action.payload.includes(cell.key)) {
            const newKey = state.keys.find((key) =>
              key.key === cell.key ? key : ""
            );
            state.keys = state.keys.map((key) =>
              key.key === newKey?.key
                ? { ...key, isWrongPlace: true, isRight: false, isUsed: false }
                : key
            );
            // if letter is absent
            return { ...cell, isRight: false, isWrongPlace: true };
          } else {
            const newKey = state.keys.find((key) =>
              key.key === cell.key ? key : ""
            );
            state.keys = state.keys.map((key) =>
              key.key === newKey?.key
                ? { ...key, isWrongPlace: false, isRight: false, isUsed: true }
                : key
            );
            return { ...cell, isRight: false, isWrongPlace: false };
          }
        });
        // summarizing the results to check is the word is right or not
        state.cells[state.activeRow].forEach((cell) => {
          if (cell.isRight) {
            state.rightLetters = state.rightLetters + 1;
          }
        });
        if (state.rightLetters === 5) {
          state.isWon = true;
          state.isGameEnded = true;
        }
        //changing the row of activeCells and nulling them
        state.activeRow = state.activeRow + 1;
        state.activeCells = state.activeCells.map(
          (el) => el && { ...el, isRight: false, key: "", isWrongPlace: false }
        );
        state.enteredKeys = 0;
        state.letterPositon = 0;
        // loose check
        if (state.activeRow === 5) {
          state.isGameEnded = true;
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleUseKey, handleBack, handleAccept } = keySlice.actions;

export default keySlice.reducer;
