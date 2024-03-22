import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    RootState,
    toggleSidebar,
    setExpanded,
    collapseAll,
} from "../../store";
import useAuth from "../../hooks/useAuth";
import { ExpandMore, ChevronRight } from "@mui/icons-material";
import { TreeView, TreeItem } from "@mui/x-tree-view";
import { Box } from "@mui/material";
import { CategoriesConfig } from "../../config/CategoriesConfig";
import { removeSpacesAndCamelCase } from "../../utils/removeSpacesAndCamelCase";
import LinksList from "./LinksList";

const CategoryList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuth();

    const { expanded } = useSelector((state: RootState) => state.sidebar);

    const renderedOptions = CategoriesConfig.map(
        ({ label, to, element, expendable = true }, index) => {
            const resultLabel = removeSpacesAndCamelCase(label);

            const treeItemLabel = (
                <div className="flex flex-row items-center px-4 my-3 space-x-2">
                    <span>{element}</span>
                    <span>{label}</span>
                </div>
            );

            const handleNavigate = () => {
                navigate(to);
                dispatch(toggleSidebar(false));
                dispatch(collapseAll());
            };

            return (
                <Box
                    key={label + "_" + index.toString()}
                    sx={{ width: "230px" }}
                >
                    {expendable ? (
                        <TreeItem
                            nodeId={label + "_" + index.toString()}
                            label={treeItemLabel}
                        >
                            <LinksList target={resultLabel} upHref={to} />
                        </TreeItem>
                    ) : (
                        <TreeItem
                            nodeId={label + "_" + index.toString()}
                            onClick={handleNavigate}
                            label={treeItemLabel}
                        />
                    )}
                </Box>
            );
        }
    );

    return (
        <TreeView
            aria-label="pages system navigator"
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ChevronRight />}
            expanded={expanded}
            onNodeToggle={(event, nodes) => dispatch(setExpanded(nodes))}
            sx={{
                flexGrow: 1,
                maxWidth: 400,
                overflowY: "auto",
            }}
        >
            <h5 className="font-semibold text-gray-500 mb-2">
                {user?.roles[0]} roles
            </h5>
            {renderedOptions}
        </TreeView>
    );
};

export default CategoryList;
