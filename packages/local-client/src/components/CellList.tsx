import { Fragment, useEffect } from "react";
import { useSelector } from "../hooks/useSelector";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";
import { useActions } from "../hooks/useActions";
import "./CellList.css";

const CellList: React.FC = () => {
  const { fetchCells, saveCells } = useActions();

  /**
   * Get cells
   */
  const cells = useSelector((state) => {
    const { cells } = state;
    const { order, data } = cells;

    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  useEffect(() => {
    fetchCells();
  }, []);

  return (
    <div className="cell-list">
      <AddCell prevCellId={null} forcedVisibility={cells.length === 0} />
      {renderedCells}
    </div>
  );
};

export default CellList;
