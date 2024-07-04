import { LogTagStyleObject } from "./types";
import counterColor from "counter-color";
import { CombinedLogTags, combineLogTags, objectToStyleCssString, randomHexColor, strColorHash } from "./utils";

export type LogTag = [tag: string, style: string];

export function logTag(text: string, styleOrBg?: LogTagStyleObject | string): LogTag {
    let style =
        typeof styleOrBg === "string"
            ? { background: styleOrBg } //
            : styleOrBg || {};

    const bg =
        style?.background === "random" //
            ? randomHexColor()
            : style?.background || strColorHash(text);
    const fg = counterColor(bg, { threshold: 0.3 });

    const css = objectToStyleCssString({
        color: fg,
        "font-size": "1em",
        padding: ".1em .4em",
        "margin-left": ".4em",
        "border-radius": ".3em",
        "text-shadow": `0 0 4px #22222233`,
        ...style,
        background: bg,
    });

    return [`%c${text}`, css];
}

export function logTags(...tags: [text: string, styleOrBg?: LogTagStyleObject | string][]): CombinedLogTags {
    return combineLogTags(tags.map(tag => logTag(...tag)));
}
