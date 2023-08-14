type Schema =
  | string
  | number
  | bigint
  | Schema[]
  | {
      [key: string]: Schema;
    };
declare function stringObject(
  string: string,
  props: Exclude<Schema, string | bigint | number>
): string;
export default stringObject;
