import { useLocation, Link } from "react-router-dom";
import LoginForm from "../../forms/LoginForm";
import RegisterForm from "../../forms/RegisterForm";
import ResetPasswordForm from "../../forms/ResetPasswordForm";
import { SignType } from "../../enums/signType.enum";
import Logo from "../Logo";
import Footer from "../Footer";

const AuthContainer = () => {
    const { pathname } = useLocation();

    return (
        <div>
            <div className="flex flex-col bg-white shadow rounded w-screen md:min-w-96 md:w-full">
                <Logo primary />
                <div className="flex flex-col text-center px-8 py-4">
                    {pathname === SignType.Reset ? (
                        <>
                            <h3 className="text-lg text-gray-700 font-semibold">
                                Reset Password
                            </h3>
                            <p className="text-sm text-gray-500">
                                Enter your email address to reset your password.
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="text-lg text-gray-700 font-semibold">
                                {pathname === SignType.Login
                                    ? "Sign In"
                                    : "Sign Up"}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {pathname === SignType.Login
                                    ? "Sign in to your account"
                                    : "Create an account to get started"}
                            </p>
                        </>
                    )}
                </div>
                <div>
                    {pathname === SignType.Login ? (
                        <LoginForm />
                    ) : pathname === SignType.Register ? (
                        <RegisterForm />
                    ) : pathname === SignType.Reset ? (
                        <ResetPasswordForm />
                    ) : null}
                </div>
            </div>
            <Footer center>
                {pathname === SignType.Login ? (
                    <p>
                        Don't have an account?{" "}
                        <Link
                            to={SignType.Register}
                            className="hover:text-gray-700"
                        >
                            Sign Up
                        </Link>
                    </p>
                ) : pathname === SignType.Register ? (
                    <p>
                        Already have an account?{" "}
                        <Link
                            to={SignType.Login}
                            className="hover:text-gray-700"
                        >
                            Sign In
                        </Link>
                    </p>
                ) : (
                    <p>
                        Remember your password?{" "}
                        <Link
                            to={SignType.Reset}
                            className="hover:text-gray-700"
                        >
                            Sign In
                        </Link>
                    </p>
                )}
            </Footer>
        </div>
    );
};

export default AuthContainer;
