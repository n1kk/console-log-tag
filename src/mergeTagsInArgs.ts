import { isLogTag, isStyledText } from "./utils";

export function mergeTagsInArgs<T extends (...args: any[]) => void>(logger: T): T;
export function mergeTagsInArgs(args: any[]): any[];
export function mergeTagsInArgs(loggerOrArgs: ((...args: any[]) => void) | any[]) {
    if (typeof loggerOrArgs === "function") {
        return function (this: any, ...args: any[]) {
            loggerOrArgs.apply(this, mergeTagsInArgs(args));
        };
    }

    const args: any[] = loggerOrArgs;
    let tagStr = "";
    const tagStyles = [];
    const logArgs = [];

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (isStyledText(arg)) {
            tagStr += arg;
            tagStyles.push(args[i + 1]);
            i++;
        } else if (isLogTag(arg)) {
            tagStr += arg[0];
            tagStyles.push(arg[1]);
        } else {
            logArgs.push(arg);
        }
    }

    return [tagStr, ...tagStyles, ...logArgs];
}
