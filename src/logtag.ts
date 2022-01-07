import { LogTag, LogTagStyle } from "./types";
import counterColor from "counter-color";
import { cssToStr, randomHexColor, strColorHash } from "./utils";

export function logtag(text: string, styleOrBg?: LogTagStyle | string): LogTag {
    let style =
        typeof styleOrBg === "string"
            ? { background: styleOrBg } //
            : styleOrBg || {};

    const bg =
        style?.background === "random" //
            ? randomHexColor()
            : style?.background || strColorHash(text);
    const fg = counterColor(bg, { threshold: 0.3 });

    const css = cssToStr({
        color: fg,
        "font-size": "1em",
        padding: ".1em .4em",
        "margin-left": ".4em",
        "margin-top": ".4em",
        "margin-bottom": ".4em",
        "border-radius": ".3em",
        "text-shadow": `0 0 2px #22222233`,
        ...style,
        background: bg,
    });

    return [`%c${text}`, css];
}
