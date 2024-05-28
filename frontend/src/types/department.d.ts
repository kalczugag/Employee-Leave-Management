import { EditorProps } from "react-draft-wysiwyg";

export interface Department {
    _id?: string;
    name: string;
    shortName?: string;
    details?: EditorProps | any;
    active?: boolean;
}
