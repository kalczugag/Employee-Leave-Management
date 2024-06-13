import DefaultPage from "../layout/DefaultPage";
import Logo from "@components/Logo";

const ContactUs = () => {
    return (
        <DefaultPage label="Contact Us" bg>
            <Logo primary />
            <p className="mb-4">
                We'd love to hear from you! If you have any questions, feedback,
                or concerns, please feel free to reach out to us.
            </p>
            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
            <ul className="list-disc list-inside">
                <li>
                    <strong>Email:</strong>{" "}
                    <a
                        href="mailto:info@leaveapp.com"
                        className="text-blue-500"
                    >
                        info@leaveapp.com
                    </a>
                </li>
                <li>
                    <strong>Phone:</strong> +1 (555) 123-4567
                </li>
                <li>
                    <strong>Address:</strong> 123 Main Street, Suite 400,
                    Anytown, USA
                </li>
            </ul>
        </DefaultPage>
    );
};

export default ContactUs;
