function replaceStringObject(props) {
    function replace(matched) {
        const args = matched.substring(1, matched.length - 1).split(".");
        let workingValue = props;
        let returnValue = matched;
        args.forEach((value) => {
            const { validFunction, key, args } = isValidFunctionExpresion(workingValue, value);
            key && (value = key);
            switch (true) {
                case workingValue instanceof Map: {
                    // @ts-expect-error
                    workingValue = workingValue.get(value);
                    break;
                }
                default: {
                    // @ts-expect-error
                    workingValue = workingValue?.[value];
                    break;
                }
            }
            if (validFunction) {
                // @ts-expect-error
                const result = workingValue.call(props, ...args);
                if (result)
                    workingValue = result;
            }
            switch (typeof workingValue) {
                case "string":
                    returnValue = workingValue;
                    break;
                case "number":
                case "bigint":
                    // @ts-expect-error
                    returnValue = workingValue.toString();
                    break;
            }
        });
        return returnValue;
    }
    return replace;
}
function isValidFunctionExpresion(props, value) {
    const [name, ...args] = value.split(":");
    const entries = props instanceof Map ? props : Object.entries(props);
    for (const [key, value] of entries) {
        if (typeof value !== "function")
            continue;
        const [funcName, ...funcArgs] = key.split(":");
        if (!funcArgs.length)
            continue;
        if (funcName === name &&
            (args.length === funcArgs.length ||
                (args.length > funcArgs.length && funcArgs.pop()?.endsWith("*")))) {
            return { validFunction: true, key: key, args: args };
        }
        else if (funcName === name)
            return { validFunction: false, key: key };
    }
    return { validFunction: false };
}
function stringObject(string, props) {
    const stringObjectRegex = /({[^.{}]+(\.[^.{}]+)*})/g;
    const updatedString = string.replaceAll(stringObjectRegex, replaceStringObject(props));
    return updatedString;
}
export default stringObject;
