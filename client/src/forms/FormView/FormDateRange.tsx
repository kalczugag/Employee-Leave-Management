import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { Field } from "react-final-form";

export const FormDateRange = () => {
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    };

    //change this library to https://github.com/wojtekmaj/react-timerange-picker
    return (
        <Field name="x" type="date">
            {({ input, meta }) => (
                <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={input.onChange}
                />
            )}
        </Field>
    );
};
