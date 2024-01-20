import { Route, Routes } from "react-router-dom";
import SignPage, { SignType } from "./pages/SignPage";

const App = () => {
    return (
        <div>
            <Routes>
                <Route
                    path="/login"
                    element={<SignPage action={SignType.Login} />}
                />
                <Route
                    path="/register"
                    element={<SignPage action={SignType.Register} />}
                />
            </Routes>
        </div>
    );
};

export default App;
