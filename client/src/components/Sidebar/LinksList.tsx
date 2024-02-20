import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../store";
import { LinksConfig } from "../../config/LinksConfig";
import { TreeItem } from "@mui/x-tree-view";

interface Props {
    target: string;
    upHref: string;
}

const LinksList = ({ target, upHref }: Props) => {
    const dispatch = useDispatch();

    let renderedLinks: null | any;

    if (target in LinksConfig) {
        renderedLinks = LinksConfig[target].map(
            ({ label, to, element }, index) => {
                return (
                    <TreeItem
                        key={label + "_" + index.toString()}
                        nodeId={label + "_" + index.toString()}
                        label={
                            <Link
                                to={`${upHref}/${to}`}
                                onClick={() => dispatch(toggleSidebar(false))}
                                className={`flex flex-row items-center space-x-2 p-2 text-sm`}
                            >
                                <div className="flex items-center">
                                    {element}
                                </div>
                                <div>
                                    {label.charAt(0).toUpperCase() +
                                        label.slice(1)}
                                </div>
                            </Link>
                        }
                    />
                );
            }
        );
    }

    return <>{renderedLinks}</>;
};

export default LinksList;
