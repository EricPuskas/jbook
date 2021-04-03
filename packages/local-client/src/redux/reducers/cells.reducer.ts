import produce from "immer";
import { Types } from "../types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface Cells {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: Cells = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce(
  (state: Cells = initialState, action: Action): Cells => {
    switch (action.type) {
      case Types.FETCH_CELLS:
        state.loading = true;
        state.error = null;

        return state;
      case Types.FETCH_CELLS_COMPLETE:
        state.order = action.payload.map((cell) => cell.id);
        state.data = action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as Cells["data"]);

        return state;
      case Types.SAVE_CELLS_ERROR:
      case Types.FETCH_CELLS_ERROR:
        state.loading = false;
        state.error = action.payload;

        return state;
      case Types.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;
      case Types.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((cellId) => cellId !== action.payload);
        return state;
      case Types.MOVE_CELL:
        const { direction } = action.payload;

        const index = state.order.findIndex(
          (cellId) => cellId === action.payload.id
        );
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return state;
      case Types.INSERT_CELL_AFTER:
        const newCell: Cell = {
          id: getRandomId(),
          type: action.payload.type,
          content: "",
        };

        state.data[newCell.id] = newCell;

        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );

        if (foundIndex < 0) {
          state.order.unshift(newCell.id);
        } else {
          state.order.splice(foundIndex + 1, 0, newCell.id);
        }

        return state;
      default:
        return state;
    }
  }
);

const getRandomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export default reducer;
