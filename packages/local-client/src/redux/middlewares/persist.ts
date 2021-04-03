import { Dispatch } from "redux";
import { Action } from "../actions";
import { Types } from "../types";
import { saveCells } from "../creators";
import { RootState } from "../reducers";

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;

  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);

      if (
        [
          Types.MOVE_CELL,
          Types.UPDATE_CELL,
          Types.INSERT_CELL_AFTER,
          Types.DELETE_CELL,
        ].includes(action.type)
      ) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 750);
      }
    };
  };
};
