function replaceStringObject(props) {
    function replace(matched) {
        const args = matched.substring(1, matched.length - 1).split(".");
        let workingValue = props;
        let returnValue = matched;
        args.forEach((value) => {
            // @ts-expect-error
            workingValue = workingValue?.[value];
            switch (typeof workingValue) {
                case "string":
                    returnValue = workingValue;
                    break;
                case "number":
                case "bigint": // @ts-expect-error
                    returnValue = workingValue.toString();
                    break;
            }
        });
        return returnValue;
    }
    return replace;
}
function stringObject(string, props) {
    const stringObjectRegex = /({[^.{}]+(\.[^.{}]+)*})/g;
    const updatedString = string.replaceAll(stringObjectRegex, replaceStringObject(props));
    return updatedString;
}

export default stringObject