import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { createPortal } from "react-dom";
import useSnackbar from "./hooks/useSnackbar";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DepartmentNew from "./pages/Department/new";
import DepartmentList from "./pages/Department/list";
import EmployeeNew from "./pages/Employee/new";
import EmployeeList from "./pages/Employee/list";
import LeaveTypeList from "./pages/LeaveType/list";
import LeaveTypeUpdate from "./pages/LeaveType/edit";
import LeaveTypeNew from "./pages/LeaveType/new";
import NotFound from "./pages/404";
import PrivateOutlet from "./components/PrivateOutlet";
import SnackbarMsg from "./components/SnackbarMsg";

const App = () => {
    const { handleOpen } = useSnackbar();

    useEffect(() => {
        handleOpen("Successful logged in", "success");
    }, [handleOpen]);

    return (
        <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route element={<PrivateOutlet />}>
                <Route index element={<Dashboard />} />
                <Route path="/department">
                    <Route path="new" element={<DepartmentNew />} />
                    <Route path="list" element={<DepartmentList />} />
                </Route>
                <Route path="/leave-type">
                    <Route path="new" element={<LeaveTypeNew />} />
                    <Route path="edit" element={<LeaveTypeUpdate />} />
                    <Route path="list" element={<LeaveTypeList />} />
                </Route>
                <Route path="/employee">
                    <Route path="new" element={<EmployeeNew />} />
                    <Route path="list" element={<EmployeeList />} />
                </Route>
                <Route path="/leave"></Route>
            </Route>
            <Route path="*" element={<NotFound />} />
            {createPortal(<SnackbarMsg />, document.body)}
        </Routes>
    );
};

export default App;
