import { useEffect } from "react";
import CodeEditor from "./CodeEditor";
import CodePreview from "./CodePreview";
import Resizable from "./Resizable";
import { Cell } from "../redux";
import { useActions } from "../hooks/useActions";
import { useSelector } from "../hooks/useSelector";
import { useCumulativeCode } from "../hooks/useCumulativeCode";
import "./CodeCell.css";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = (props) => {
  const { cell } = props;

  const { updateCell, createBundle } = useActions();
  const bundle = useSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      console.log("this");
      createBundle(cell.id, cumulativeCode);
    }, 750);

    /**
     * Will be called the next time useEffect is called
     */
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [cell.id, cumulativeCode, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-cover-container">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <CodePreview code={bundle.code} error={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
