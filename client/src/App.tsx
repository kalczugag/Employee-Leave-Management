import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/test";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Auth />} />
                <Route path="/register" element={<Auth />} />
                <Route element={<Dashboard />}>
                    <Route index element={<Test />} />
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
