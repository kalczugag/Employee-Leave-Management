import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NewDepartment from "./pages/NewDepartment";
import DepartmentList from "./pages/DepartmentList";
import NewEmployee from "./pages/NewEmployee";
import EmployeeList from "./pages/EmployeeList";
import LeaveTypeList from "./pages/LeaveTypeList";
// import Test from "./pages/test";

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/login" element={<Auth />} />
                <Route path="/register" element={<Auth />} />
                <Route element={<Home />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/department">
                        <Route path="new" element={<NewDepartment />} />
                        <Route path="list" element={<DepartmentList />} />
                    </Route>
                    <Route path="/leavetype">
                        <Route path="list" element={<LeaveTypeList />} />
                    </Route>
                    <Route path="/employee">
                        <Route path="new" element={<NewEmployee />} />
                        <Route path="list" element={<EmployeeList />} />
                    </Route>
                    <Route path="/leave"></Route>
                </Route>
            </Routes>
        </Layout>
    );
};

export default App;
