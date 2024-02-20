import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleSidebar } from "../../store";
import { ExpandMore, ChevronRight } from "@mui/icons-material";
import { TreeView, TreeItem } from "@mui/x-tree-view";
import { Box } from "@mui/material";
import { CategoriesConfig } from "../../config/CategoriesConfig";
import { removeSpacesAndCamelCase } from "../../utils/removeSpacesAndCamelCase";
import LinksList from "./LinksList";

const CategoryList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const renderedOptions = CategoriesConfig.map(
        ({ label, to, element, expendable = true }, index) => {
            const resultLabel = removeSpacesAndCamelCase(label);

            const treeItemLabel = (
                <div
                    className={`flex flex-row items-center px-4 my-3 space-x-2`}
                >
                    <div>{element}</div>
                    <div>{label}</div>
                </div>
            );

            const handleNavigate = () => {
                navigate(to);
                dispatch(toggleSidebar(false));
            };

            return (
                <Box sx={{ width: "225px" }}>
                    {expendable ? (
                        <TreeItem
                            key={label + "_" + index.toString()}
                            nodeId={label + "_" + index.toString()}
                            label={treeItemLabel}
                        >
                            <LinksList target={resultLabel} upHref={to} />
                        </TreeItem>
                    ) : (
                        <TreeItem
                            key={label + "_" + index.toString()}
                            nodeId={label + "_" + index.toString()}
                            onClick={handleNavigate}
                            label={
                                <div className="flex flex-row items-center px-4 my-3 space-x-2">
                                    <div>{element}</div>
                                    <div>{label}</div>
                                </div>
                            }
                        />
                    )}
                </Box>
            );
        }
    );

    return (
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ChevronRight />}
            sx={{
                flexGrow: 1,
                maxWidth: 400,
                overflowY: "auto",
            }}
        >
            {renderedOptions}
        </TreeView>
    );
};

export default CategoryList;
