import { logTag, taggedLogger, mergeTagsInArgs, logTags, useLogTagsInConsole } from "../src";

// creating single tag
const app = logTag("app"); // will pick unique color
const err = logTag("err", "red"); // will auto-detect what text color has more contrast with background
const red2 = logTag("also-red", "#F00");
const custom = logTag("yellow-pill", {
    background: "#f3d411",
    "border-radius": "10px",
    "box-shadow": "1px 1px 5px grey",
});

// tags need to be spread into console for styles to be picked up
console.log(...app, "starting");
// -> [App] starting

// by default, you CAN'T use two tags in a console, the styles won't be recognized
console.log(...app, ...err, "oops!");
// -> [App] %cSubLog {_CSS_STRING_} initializing

// creating multi-tag
const multi = logTags(["first"], ["second"]);
const colored = logTags(["A", "blue"], ["B", "#F80"]);
const styled = logTags(["A", { background: "#FF8" }], ["B", { "border-radius": "10px" }]);

console.log(...multi, "initializing");
// -> [first] [second] initializing

// ----------------------------------------

// you can patch console methods to support tags
useLogTagsInConsole(); // patches `log`, `info`, 'debug`, `warn` and `error` methods

console.log(app, "starting");
// -> [App] starting
console.debug(multi, "loading");
// -> [first] [second] loading

// ----------------------------------------

// You can create a tagged logger
const systemLog = taggedLogger("System", { logFn: console.debug });
systemLog("loading");
// -> [System] loading

// tagged loggers have internal method to create child loggers
const subSystemA = systemLog.childLogger("Subsystem A");
subSystemA("processing");
// -> [System] [Subsystem A] processing

// if you want to log multiple tags in your own logging library
// there is a tool to merge tags together
const myLogger = console.debug;
const mergedTags = mergeTagsInArgs([logTag("tag-1"), logTag("tag-2")]);
myLogger(...mergedTags, "completed");
// -> [tag-1] [tag-2] completed

// or convert your logger to support tags, it'll move tags in any
// position to front and merge them
const myLogger2 = mergeTagsInArgs(console.debug);
myLogger2(logTag("tag-1"), logTag("tag-2"), "completed");
