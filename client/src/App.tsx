import { Route, Routes } from "react-router-dom";
import { createPortal } from "react-dom";
import Layout from "./layout/Layout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NewDepartment from "./pages/Department/new";
import DepartmentList from "./pages/Department/list";
import NewEmployee from "./pages/Employee/new";
import EmployeeList from "./pages/Employee/list";
import LeaveTypeList from "./pages/LeaveType/list";
import LeaveTypeUpdate from "./pages/LeaveType/edit";
import PrivateOutlet from "./components/PrivateOutlet";
import SnackbarMsg from "./components/SnackbarMsg";

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/login" element={<Auth />} />
                <Route path="/register" element={<Auth />} />
                <Route element={<PrivateOutlet />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/department">
                        <Route path="new" element={<NewDepartment />} />
                        <Route path="list" element={<DepartmentList />} />
                    </Route>
                    <Route path="/leave-type">
                        <Route path="edit" element={<LeaveTypeUpdate />} />
                        <Route path="list" element={<LeaveTypeList />} />
                    </Route>
                    <Route path="/employee">
                        <Route path="new" element={<NewEmployee />} />
                        <Route path="list" element={<EmployeeList />} />
                    </Route>
                    <Route path="/leave"></Route>
                </Route>
                {/* handle 404 /* */}
            </Routes>
            {createPortal(<SnackbarMsg />, document.body)}
        </Layout>
    );
};

export default App;
