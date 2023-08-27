type SchemaValues = string | number | bigint | SchemaValues[] | {
    [key: string]: SchemaValues;
} | Map<string, SchemaValues> | ((...args: string[]) => SchemaValues);
export type Schema = Exclude<SchemaValues, string | number | bigint>;
declare function stringObject(string: string, props: Schema): string;
export default stringObject;
