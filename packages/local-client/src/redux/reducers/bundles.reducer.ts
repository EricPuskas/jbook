import produce from "immer";
import { Types } from "../types";
import { Action } from "../actions";

interface Bundles {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: Bundles = {};

const reducer = produce(
  (state: Bundles = initialState, action: Action): Bundles => {
    switch (action.type) {
      case Types.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: "",
          err: "",
        };
        return state;
      case Types.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
