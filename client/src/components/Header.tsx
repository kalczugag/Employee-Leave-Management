import { Form, Field } from "react-final-form";
import { FormControl, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Logo";
import LanguagesMenu from "./LanguagesMenu";
import AccountMenu from "./AccountMenu";

const Header = () => {
    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div className="flex flex-row items-center justify-center p-2 px-6 md:justify-between">
            <section>
                <Logo />
            </section>
            <section className="flex flex-row items-center md:space-x-4">
                <MenuIcon />
                {/* change to reusable */}
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => (
                        <form
                            className="hidden md:block"
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
                <LanguagesMenu />
                <AccountMenu />
            </section>
        </div>
    );
};

export default Header;
