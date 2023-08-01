import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./state";

import "./styles/Common.css";
import AppRouter from "./utils/AppRouter";

function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={AppRouter} />
      </Provider>
    </div>
  );
}

export default App;
