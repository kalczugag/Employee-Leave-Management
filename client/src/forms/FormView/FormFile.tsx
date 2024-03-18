import { Field } from "react-final-form";
import { convertToBase64 } from "../../utils/convertToBase64";

interface FormFileProps {
    options: { label: string; name: string };
    required?: boolean;
    disabled?: boolean;
}

export const FormFile = ({ options, required, disabled }: FormFileProps) => {
    const handleImageChange = async (
        files: any,
        onChange: (event: any) => void
    ) => {
        const file = files[0];
        const base64 = await convertToBase64(file);
        onChange(base64);
    };

    return (
        <Field<string> name={options.name}>
            {({ input: { value, onChange, ...input } }) => (
                <input
                    {...input}
                    type="file"
                    className="col-span-2"
                    onChange={({ target }) =>
                        handleImageChange(target.files, onChange)
                    }
                    required={required}
                    disabled={disabled}
                    accept="image/*"
                />
            )}
        </Field>
    );
};
