import { combineLogTags } from "./utils";
import { LogTagStyleObject } from "./types";
import { LogTag, logTag } from "./logTag";

type TaggedLoggerOptions = {
    bg?: string;
    style?: LogTagStyleObject;
    logFn?: (...args: any[]) => void;
    tags?: LogTag[];
};

type TaggedLogger = {
    (...args: any[]): void;
    childLogger: typeof taggedLogger;
};

export function taggedLogger(text: string, options?: TaggedLoggerOptions): TaggedLogger {
    const { bg, style, logFn = console.log, tags = [] } = options ?? {};

    const tag: LogTag = logTag(text, style ?? bg);
    const combinedTags = combineLogTags(...tags, tag);

    const log = function (this: any, ...args: unknown[]) {
        logFn.call(this, ...combinedTags, ...args);
    } as TaggedLogger;

    log.childLogger = (text: string, options?: TaggedLoggerOptions) => {
        return taggedLogger(text, {
            ...options,
            logFn: options?.logFn ?? logFn,
            tags: [...(options?.tags ?? []), ...tags, tag],
        });
    };

    return log;
}
