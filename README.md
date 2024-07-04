<p align="center">
  <img src="https://github.com/n1kk/log-tags/blob/master/assets/headline2.png?raw=true">
  <img src="https://github.com/n1kk/log-tags/blob/master/assets/headline3.png?raw=true">
</p>

---

# log-tags

Set of tools that help to add color tags to your console logs.

Typescript, es module, configurable, tree-shakable. [Generated typedoc reference](https://n1kk.github.io/log-tags/modules.html).

![demo](https://github.com/n1kk/log-tags/blob/master/assets/demo.gif?raw=true)

## Install

```bash
# with npm
npm install log-tags
# with yarn
yarn add log-tags
# with pnpm
pnpm add log-tags
```

## Feature list

- Preconfigured default styles
- Automatic background color generation based on tag name (same name will give same color)
- Automatic text color selection (black/white) based on which one will be more readable for a given background
- Ability to install tag support for global console methods
- Simple extendable tagged logger supplied

## Usage

```ts
// creating single tag
const app = logTag("app"); // will pick color unique to 'app' string
const err = logTag("err", "red"); // will auto-detect what text color has more contrast with background
const red2 = logTag("also-red", "#F00");
const custom = logTag("yellow-pill", {
    // limited css properties suported: https://developer.mozilla.org/en-US/docs/Web/API/console#styling_console_output
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

// creating multi-tags
const multi = logTags(["first"], ["second"]);
const colored = logTags(["A", "blue"], ["B", "#F80"]);
const styled = logTags(["A", { background: "#FF8" }], ["B", { "border-radius": "10px" }]);

console.log(...multi, "initializing");
// -> [first] [second] initializing
```

## Adding tag support to `console`

You can use supplied util to patch global console methods to support tags. All tags in arguments then are auto-detected, moved to the front and merged.

```ts
useLogTagsInConsole(); // patches all console text output methods
useLogTagsInConsole(["log"]); // patches only 'log' method

const app = logTag("app")
console.log(app, "starting");
// -> [App] starting

console.debug(logTag("first"), logTag("second"), "loading");
// -> [first] [second] loading

console.info(logTag("one"), "lorem", logTag("two"), "ipsum");
// -> [one] [two] lorem ipsum
```

## Tagged Logger

This package provides a simple logging utility that supports extending logger with child sub instances.

```ts
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
```

#### Caveats

Tags are using consoles string substitution which means that it won't be available for you. You can still use string templates in your logs.
