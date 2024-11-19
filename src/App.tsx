import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Store";
import "react-toastify/dist/ReactToastify.css";
import RootRouter from "./Routes/RootRouter";
import { ToastContainer } from "react-toastify";

const baseName = import.meta.env.VITE_BASE_NAME;

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HelmetProvider>
          <BrowserRouter basename={baseName}>
            <RootRouter />
          </BrowserRouter>
          <ToastContainer theme="dark" />
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
