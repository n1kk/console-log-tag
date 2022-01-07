import { LogTag, LogTagStyle } from "./types";

export const randomHex = () => ((Math.random() * 16) >> 0).toString(16);
export const randomHexColor = () => `#${randomHex()}${randomHex()}${randomHex()}`;

export const cssToStr = (css: Record<string, string>) =>
    Object.entries(css)
        .map(_ => _.join(":"))
        .join(";");

export const strColorHash = (s: string) => {
    const arr = [...s];
    const sum1 = arr.map(_ => _.charCodeAt(0)).reduce((sum, n) => sum + n, 0);
    const hashes = [0, 0, 0].map((_, i) => ((sum1 * 2) ** (i + 5) % 0xffffff) / 0xffffff);
    const rgb = hashes.map(hash => {
        let h = (hash * 16) >> 0;
        if (h % 2 == 0) h = Math.max(0, h - 1);
        return h;
    });
    const hex = "#" + rgb.map(_ => _.toString(16).repeat(2)).join("");
    return hex;
};

export function mergeTags(...args: any[]) {
    let tagStr = "";
    const tagStyles = [];
    const logArgs = [];

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (isStyledText(arg)) {
            tagStr += arg;
            tagStyles.push(args[i + 1]);
            i++;
        } else if (isTag(arg)) {
            tagStr += arg[0];
            tagStyles.push(arg[1]);
        } else {
            logArgs.push(arg);
        }
    }

    return [tagStr, ...tagStyles, ...logArgs];
}

export function isTag(value: any): value is LogTag {
    return value && Array.isArray(value) && isStyledText(value[0]);
}

export function isStyledText(value: any): value is string {
    return typeof value === "string" && value.startsWith("%c");
}

export function isString(value: any): value is string {
    return value && typeof value === "string";
}

export function isStyle(value: any): value is LogTagStyle {
    return value && typeof value === "object";
}
