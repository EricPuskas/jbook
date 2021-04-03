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

      if (data.length < 1) {
        data.push({
          id: "default_cell_01",
          content:
            "# JBook\n\nThis is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.\n\n- Click any text cell (including this one) to edit it.\n- The code in each editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell.\n- You can show any React component, string, number, or anything else by calling the `show` function. This is a function built into this environment. Call show multiple times to show multiple values.\n- Re-order or delete cells using the buttons on the top right.\n- Add new cells by hovering on the divider between each cell.\n\n\nAll of your changes get saved to the file you opened JBook with. So if you ran `npx jbook-cli serve test.js`, all of the text and code you write will be saved to the `test.js` file.\n\nNote: \n- If no file was provided when serving, then a default `notebook.js` will be created instead.\n- You can share these generated files so other people can import your jbook content.",
          type: "text",
        });
      }

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
