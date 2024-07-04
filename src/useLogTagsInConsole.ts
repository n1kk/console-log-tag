import { mergeTagsInArgs } from "./mergeTagsInArgs";

export function useLogTagsInConsole(
    methods: ("log" | "info" | "debug" | "warn" | "error")[] = ["log", "info", "debug", "warn", "error"],
) {
    for (let i = 0; i < methods.length; i++) {
        const method = methods[i];
        console[method] = mergeTagsInArgs(console[method]);
    }
}
