import DefaultPage from "../layout/DefaultPage";
import Logo from "@components/Logo";

const About = () => {
    return (
        <DefaultPage label="About Employee Leave Management" bg>
            <Logo primary />
            <p className="mb-4">
                Employee Leave Management is a full-stack web application built
                using the MERN stack to facilitate efficient management of
                employee leave requests and approvals within an organization.
            </p>
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside">
                <li>User Authentication: Secure user authentication.</li>
                <li>
                    Leave Requests: Employees can submit leave requests with
                    details such as start date, end date, and reason.
                </li>
                <li>
                    Leave Approval: Managers can review and approve/deny leave
                    requests.
                </li>
                <li>
                    Dashboard: Interactive dashboard for employees and managers
                    to track leave history and status.
                </li>
                <li>
                    Notifications: Automatic email notifications for leave
                    request status updates.
                </li>
                <li>
                    Admin Panel: Admins can manage user roles, view logs, and
                    perform administrative tasks.
                </li>
            </ul>
        </DefaultPage>
    );
};

export default About;
