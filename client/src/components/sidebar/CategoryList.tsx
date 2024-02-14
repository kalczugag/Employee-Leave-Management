import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../store";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { CategoriesConfig } from "../../config/CategoriesConfig";
import { removeSpacesAndCamelCase } from "../../utils/removeSpacesAndCamelCase";
import { Link } from "react-router-dom";
import LinksListt from "./LinksList";

export default function FirstComponent() {
    const dispatch = useDispatch();

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

            return (
                <>
                    {expendable ? (
                        <TreeItem
                            key={label + "_" + index.toString()}
                            nodeId={label + "_" + index.toString()}
                            label={treeItemLabel}
                        >
                            <LinksListt target={resultLabel} />
                        </TreeItem>
                    ) : (
                        <TreeItem
                            key={label + "_" + index.toString()}
                            nodeId={label + "_" + index.toString()}
                            label={
                                <Link
                                    to={to}
                                    onClick={() =>
                                        dispatch(toggleSidebar(false))
                                    }
                                    className={`flex flex-row items-center px-4 my-3 space-x-2`}
                                >
                                    <div>{element}</div>
                                    <div>{label}</div>
                                </Link>
                            }
                        />
                    )}
                </>
            );
        }
    );

    return (
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
            {renderedOptions}
        </TreeView>
    );
}
