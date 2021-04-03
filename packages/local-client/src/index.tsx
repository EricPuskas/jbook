import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux";
import CellList from "./components/CellList";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <div>
        <CellList />
      </div>
    </ReduxProvider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
