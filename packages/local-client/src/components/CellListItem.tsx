import React, { Fragment } from "react";
import { Cell } from "../redux";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
import ActionBar from "./ActionBar";
import "./CellListItem.css";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = (props) => {
  const { cell } = props;

  let child: JSX.Element;

  if (cell.type === "code") {
    child = (
      <Fragment>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </Fragment>
    );
  } else {
    child = (
      <Fragment>
        <ActionBar id={cell.id} />
        <TextEditor cell={cell} />
      </Fragment>
    );
  }

  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
