import { logTag } from "../src/logTag";
import { taggedLogger } from "../src";
import { tlog } from "./test-utils";
import { useLogTagsInConsole } from "../src/useLogTagsInConsole";

useLogTagsInConsole();

console.clear();

console.log(logTag("log-1"), logTag("log-2"));
console.info(logTag("info-1"), logTag("info-2"));
console.debug(logTag("debug-1"), logTag("debug-2"));
console.error(logTag("error-1", "red"), logTag("error-2", "#f88"));
