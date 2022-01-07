import { isString, isStyle, isTag, mergeTags } from "./utils";
import { LogTag, LogTagStyle, TaggedLogger } from "./types";
import { logtag } from "./logtag";

export function tlog(...args: any) {
    console.log(...mergeTags(...args));
}

export function taggedLogger(text?: string, bg?: string): TaggedLogger;
export function taggedLogger(text?: string, style?: LogTagStyle): TaggedLogger;
export function taggedLogger(...tags: LogTag[]): TaggedLogger;
export function taggedLogger(...args: [text?: string, style?: LogTagStyle | string] | LogTag[]): TaggedLogger {
    let tags: LogTag[] = [];

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (isTag(arg)) {
            tags.push(arg);
        } else if (isString(arg)) {
            let nextArg = args[i + 1];
            if (!isTag(nextArg)) {
                if (isString(nextArg)) {
                    tags.push(logtag(arg, nextArg));
                    i += 1;
                } else if (isStyle(nextArg)) {
                    tags.push(logtag(arg, nextArg));
                    i += 1;
                }
            } else {
                tags.push(logtag(arg));
            }
        }
    }

    let log: TaggedLogger = console.log.bind(console, ...mergeTags(...tags)) as TaggedLogger;

    Object.defineProperty(log, "logger", {
        writable: false,
        value: taggedLogger.bind(null, ...tags),
    });

    return log;
}
