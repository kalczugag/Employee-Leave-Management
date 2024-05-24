import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../store";
import { CategoriesConfig } from "../../config/CategoriesConfig";
import { FormControl, Input, InputAdornment } from "@mui/material";
import { Search, Menu } from "@mui/icons-material";
import SearchForm from "../../forms/SearchForm";
import IconButton from "../IconButton";
import AccountMenu from "./AccountMenu";
import Logo from "../Logo";

const Header = () => {
    const dispatch = useDispatch();

    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div className="fixed top-0 left-0 right-0 flex flex-row justify-between bg-white px-5 p-2 z-50 md:px-10 md:justify-center md:space-x-8">
            <section className="hidden md:block">
                <Logo />
            </section>
            <section className="flex flex-row items-center md:space-x-4 md:flex-1">
                <IconButton
                    menuIcon={<Menu />}
                    className="md:hidden"
                    handleOpen={() => dispatch(toggleSidebar(true))}
                />
                {/* change to reusable */}
                {/* <SearchForm data={CategoriesConfig} /> */}
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
                                                    <Search />
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
            <section className="flex items-center">
                <AccountMenu />
            </section>
        </div>
    );
};

export default Header;

//not centered vertically
