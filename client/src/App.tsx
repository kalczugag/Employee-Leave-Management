import { Route, Routes, useLocation } from "react-router-dom";
import { SignType } from "./enums/signType";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Test from "./pages/test";
import Dashboard from "./pages/Dashboard";

const App = () => {
    const { pathname } = useLocation();
    const isAuthPage =
        SignType.Login === pathname || SignType.Register === pathname;

    return (
        <div className="h-screen overflow-hidden">
            {!isAuthPage && (
                <>
                    <Header />
                    <Sidebar />
                </>
            )}
            <Routes>
                <Route path="/login" element={<Auth />} />
                <Route path="/register" element={<Auth />} />
                <Route element={<Home />}>
                    <Route index element={<Dashboard />} />
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
