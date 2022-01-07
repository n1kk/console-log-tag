import { logtag } from "../src/logtag";
import { taggedLogger, tlog } from "../src";

console.clear();

const { log } = console;

log(...logtag("first"));
log(...logtag("first"), ...logtag("second"));

let consoleColorData: [color: string, rgb: [r: string, g: string, b: string]][] = [
    ["Black", ["00", "00", "00"]],
    ["DarkBlue", ["00", "00", "80"]],
    ["DarkGreen", ["00", "80", "00"]],
    ["DarkCyan", ["00", "80", "80"]],
    ["DarkRed", ["80", "00", "00"]],
    ["DarkMagenta", ["80", "00", "80"]],
    ["DarkYellow", ["80", "80", "00"]],
    ["DarkGray", ["80", "80", "80"]],
    ["Blue", ["00", "00", "FF"]],
    ["Green", ["00", "FF", "00"]],
    ["Cyan", ["00", "FF", "FF"]],
    ["Red", ["FF", "00", "00"]],
    ["Magenta", ["FF", "00", "FF"]],
    ["Yellow", ["FF", "FF", "00"]],
    ["Gray", ["C0", "C0", "C0"]],
    ["White", ["FF", "FF", "FF"]],
];

consoleColorData.forEach(([name, rgb]) => {
    log(...logtag(name, { background: "#" + rgb.join("") }), "lorem ipsum ....");
    tlog(logtag(`for color ${name}`), "lorem ipsum ....");
});

tlog(logtag("random"));
tlog(logtag("RANDOM"));
tlog(logtag("blue", { background: "#ff0" }));
tlog(logtag("BLUE red", { background: "#25f", color: "#f00" }));
tlog(logtag("blue white", { background: "#25f", color: "#ddd" }));

const tag1 = logtag("tag1");
const tag2 = logtag("tag2");
const tag3 = logtag("tag3", { background: "black" });

tlog(tag1);
tlog(tag1, tag2);
tlog(tag1, tag2, tag3, "olololololo");

const log1 = taggedLogger("My Custom Log 1");
log1("AIII NOOOOO");
const log2 = taggedLogger("My Super Tag", { background: "#ff0", "font-size": "1.2em" });
log2("WOOOOOOOO");
const log3 = taggedLogger("Fatty mcFatface", { background: "#f0f", "font-weight": "700", "font-size": "1.5em" });
log3("WOOOOOOOO");

const log3_0 = log3.logger();
log3_0("NO!");
const log3_1 = log3.logger("new tag");
log3_1("TWO");
const log3_2 = log3_1.logger("another TAAAAG!!!!");
log3_2("THREE");

const mainLog = taggedLogger("console-log-tag");

mainLog("Add some color to your console!");
