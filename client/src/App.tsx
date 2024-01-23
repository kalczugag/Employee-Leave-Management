import { Route, Routes } from "react-router-dom";
import SignPage, { SignType } from "./pages/SignPage";
import DashboardPage from "./pages/DashboardPage";

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
                <Route path="/dashboard" element={<DashboardPage />}>
                    {/* sub routes coming soon */}
                </Route>
            </Routes>
        </div>
    );
};

export default App;
