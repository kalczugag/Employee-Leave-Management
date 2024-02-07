import { useState } from "react";
import { CategoriesConfig as options } from "../../config/CategoriesConfig";
import CategoryListItem from "./CategoryListItem";

const CategoryList = () => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const renderedCategories = options.map(
        ({ label, to, element, expendable }, index) => {
            return (
                <CategoryListItem
                    key={label}
                    label={label}
                    to={to}
                    element={element}
                    expendable={expendable}
                    index={index++}
                    expanded={expanded}
                    handleChange={handleChange}
                />
            );
        }
    );

    return <div className="flex flex-col space-y-2">{renderedCategories}</div>;
};

export default CategoryList;
