import { Route, Routes } from "react-router-dom";
import SignPage, { SignType } from "./pages/SignPage";
import DashboardPage from "./pages/DashboardPage";
import Test from "./pages/test";

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
                <Route path="/" element={<DashboardPage />}>
                    <Route path="/dashboard" element={<Test />} />
                    <Route path="/department">
                        <Route path="new" element={<Test />} />
                        <Route path="list" element={<Test />} />
                    </Route>
                    <Route path="/leavetype">
                        <Route path="list" element={<Test />} />
                    </Route>
                    <Route path="/employee">
                        <Route path="new" element={<Test />} />
                        <Route path="list" element={<Test />} />
                    </Route>
                    <Route path="/leave"></Route>
                </Route>
            </Routes>
        </div>
    );
};

export default App;
