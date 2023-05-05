import { DateTime } from "luxon";

const convertDateInput = (dateString: string) => {
    const date = DateTime.fromISO(dateString);
    return date.toFormat("d MMM yyyy", { locale: "fr" });
}

const convertDateFromInput = (dateString: string) => {
    return DateTime.fromFormat(dateString, "d MMM yyyy", { locale: "fr" });
}

const compareTwoDates = (date_one: string, date_two: string) => {
    const d_one = convertDateFromInput(convertDateInput(date_one))
    const d_two = convertDateFromInput(date_two)

    return d_one.diff(d_two, "days").days;
}

export {
    convertDateInput,
    convertDateFromInput,
    compareTwoDates
}