import { Form, Field } from "react-final-form";
import { FormControl, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CustomIconButtom from "../MenuIconButton";
import Logo from "../Logo";
import AccountMenu from "./AccountMenu";

const Header = () => {
    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div className="fixed top-0 left-0 right-0 flex flex-row items-center justify-center space-x-8 bg-white p-2 px-10 z-50 md:justify-between">
            <section>
                <Logo />
            </section>
            <section className="flex-1 flex flex-row items-center md:space-x-4">
                <CustomIconButtom>
                    <MenuIcon />
                </CustomIconButtom>
                {/* change to reusable */}
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => (
                        <form
                            className="hidden lg:block"
                            onSubmit={handleSubmit}
                        >
                            <Field name="search">
                                {(props) => (
                                    <FormControl variant="standard">
                                        <Input
                                            id="input-with-icon-adornment"
                                            placeholder="Search"
                                            name={props.input.name}
                                            value={props.input.value}
                                            onChange={props.input.onChange}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                )}
                            </Field>
                        </form>
                    )}
                />
            </section>
            <section className="flex-row hidden md:flex">
                {/* <LanguagesMenu /> */}
                <AccountMenu />
            </section>
        </div>
    );
};

export default Header;
