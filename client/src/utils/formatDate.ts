import _ from "lodash";

class DateUtils {
    static formatTimestamp(inputDateString: string): string {
        return _.chain(new Date(inputDateString))
            .thru((date) => ({
                year: date.getFullYear(),
                month: String(date.getMonth() + 1).padStart(2, "0"),
                day: String(date.getDate()).padStart(2, "0"),
                hours: String(date.getHours()).padStart(2, "0"),
                minutes: String(date.getMinutes()).padStart(2, "0"),
                seconds: String(date.getSeconds()).padStart(2, "0"),
            }))
            .thru(
                ({ year, month, day, hours, minutes, seconds }) =>
                    `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
            )
            .value();
    }

    static formatDate(dateString: string): {
        day: string;
        month: string;
        year: string;
    } {
        const [year, month, day] = dateString.split("-");

        const date = new Date(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day)
        );
        const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
        };
        const formattedDate = date.toLocaleDateString("en-US", options);

        const [formattedMonth, formattedDay, formattedYear] =
            formattedDate.split(" ");

        return {
            day: formattedDay.replace(/,/g, ""),
            month: formattedMonth,
            year: formattedYear,
        };
    }

    static formatDateString({
        year,
        month,
        day,
    }: {
        year: string;
        month: string;
        day: string;
    }): string {
        const monthIndex =
            new Date(Date.parse(`${month} 1, 2000`)).getMonth() + 1;

        const formattedMonth =
            monthIndex < 10 ? `0${monthIndex}` : `${monthIndex}`;
        const formattedDay =
            parseInt(day) < 10 ? `0${parseInt(day)}` : `${parseInt(day)}`;

        const formattedDateString = `${year}-${formattedMonth}-${formattedDay}`;

        return formattedDateString;
    }

    static formatDateFromMongoDB(timestamp: string): string {
        const date = new Date(timestamp);

        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        const formattedDate = `${month} ${day
            .toString()
            .padStart(2, "0")}, ${year}`;

        return formattedDate;
    }
}

export default DateUtils;
