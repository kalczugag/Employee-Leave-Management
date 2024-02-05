export const removeSpacesAndCamelCase = (inputString: string) => {
    const camelCaseString = inputString
        .replace(/\s+/g, "")
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) =>
            index === 0 ? match.toLowerCase() : match.toUpperCase()
        );
    return camelCaseString;
};
