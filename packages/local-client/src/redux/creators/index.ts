import { Dispatch } from "redux";
import axios from "axios";
import { Types } from "../types";
import { CellTypes, CellDirections, Cell } from "../cell";
import { RootState } from "../reducers";
import {
  Action,
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
} from "../actions";

import bundle from "../../bundler";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: Types.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: Types.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (
  id: string,
  direction: CellDirections
): MoveCellAction => {
  return {
    type: Types.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: Types.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: Types.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: Types.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: Types.FETCH_CELLS,
    });

    try {
      const { data }: { data: Cell[] } = await axios.get("/cells");
      dispatch({ type: Types.FETCH_CELLS_COMPLETE, payload: data });
    } catch (error) {
      dispatch({
        type: Types.FETCH_CELLS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { cells } = getState();
    const { data, order } = cells;

    const _cells = order.map((id) => data[id]);

    try {
      await axios.post("/cells", { cells: _cells });
    } catch (error) {
      dispatch({
        type: Types.SAVE_CELLS_ERROR,
        payload: error.message,
      });
    }
  };
};
