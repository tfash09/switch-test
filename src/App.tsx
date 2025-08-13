import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { store } from "./store/store";
import AppRoutes from "./routes";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer limit={2} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
