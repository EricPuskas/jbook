import { Types } from "../types";
import { CellTypes, CellDirections, Cell } from "../cell";

export interface MoveCellAction {
  type: Types.MOVE_CELL;
  payload: {
    id: string;
    direction: CellDirections;
  };
}

export interface DeleteCellAction {
  type: Types.DELETE_CELL;
  payload: string;
}

export interface InsertCellAfterAction {
  type: Types.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface UpdateCellAction {
  type: Types.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundleStartAction {
  type: Types.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompledAction {
  type: Types.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface FetchCellsAction {
  type: Types.FETCH_CELLS;
}

export interface FetchCellsCompleteAction {
  type: Types.FETCH_CELLS_COMPLETE;
  payload: Cell[];
}

export interface FetchCellsErrorAction {
  type: Types.FETCH_CELLS_ERROR;
  payload: string;
}

export interface SaveCellsErrorAction {
  type: Types.SAVE_CELLS_ERROR;
  payload: string;
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompledAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | SaveCellsErrorAction;
