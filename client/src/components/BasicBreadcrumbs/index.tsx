import { Typography, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";

type link = { label: string; path: string };

interface Props {
    links: link[];
}

const BasicBreadcrumbs = ({ links }: Props) => {
    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                {links.map((link, index) => {
                    if (index !== links.length - 1) {
                        return (
                            <Link
                                key={link.path + "_" + index.toString()}
                                className="hover:underline"
                                color="inherit"
                                to={link.path === "" ? "/" : link.path}
                            >
                                {link.label === "" ? "Dashboard" : link.label}
                            </Link>
                        );
                    }

                    return (
                        <Typography
                            key={link.path + "_" + index.toString()}
                            color="text.primary"
                        >
                            {link.label}
                        </Typography>
                    );
                })}
            </Breadcrumbs>
        </div>
    );
};

export default BasicBreadcrumbs;
