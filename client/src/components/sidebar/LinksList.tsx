import LinksListItem from "./LinksListItem";
import { LinksConfig as options } from "../../config/LinksConfig";

interface Props {
    target: string;
}

const LinksList = ({ target }: Props) => {
    let renderedLinks: null | any;

    if (target in options) {
        renderedLinks = options[target].map(({ label, to, element }) => {
            return (
                <LinksListItem
                    key={label}
                    label={label}
                    to={target.toLowerCase() + "/" + to}
                    element={element}
                />
            );
        });
    }

    return (
        <div className="flex flex-col space-y-2 text-gray-500">
            {renderedLinks}
        </div>
    );
};

export default LinksList;
