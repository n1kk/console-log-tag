import { LogTag } from "./logTag";

export const randomHex = () => ((Math.random() * 16) >> 0).toString(16);
export const randomHexColor = () => `#${randomHex()}${randomHex()}${randomHex()}`;

export const objectToStyleCssString = (css: Record<string, string>) =>
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

export type CombinedLogTags = [tags: string, ...styles: string[]];

export function combineLogTags(...tags: LogTag[] | [tags: LogTag[]]): CombinedLogTags {
    const tagList = (isLogTag(tags[0]) ? tags : tags[0]) as LogTag[];

    const tagStr = tagList.map(([text]) => text).join("");
    const tagStyles = tagList.map(([, style]) => style);

    return [tagStr, ...tagStyles];
}

export function isStyledText(value: any): value is string {
    return typeof value === "string" && value.startsWith("%c");
}

export function isLogTag(target: any): target is LogTag {
    return target && Array.isArray(target) && isStyledText(target[0]) && typeof target[1] === "string";
}
