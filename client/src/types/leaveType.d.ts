import { EditorProps } from "react-draft-wysiwyg";

export interface LeaveType {
    _id?: string;
    name: string;
    shortName?: string;
    details?: EditorProps;
    active?: boolean;
}
