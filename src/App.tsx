import { BrowserRouter } from "react-router-dom";
import './App.css';
import AppRouter from "./app/router.tsx";
import {StrictMode} from "react";
import Modal from "react-modal";

Modal.setAppElement('#root');

const App = () => {
    return (
        <StrictMode>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </StrictMode>
    );
};

export default App;