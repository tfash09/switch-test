import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { store } from "./store/store";
import AppRoutes from "./routes";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <ToastContainer limit={2} />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;
