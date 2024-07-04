import { arrOf, tlog } from "./test-utils";
import { logTag } from "../src";

console.clear();

const t = (t: string, c?: string, b?: string) => logTag(t, { background: c, border: b });

const colors: string[] = [
    //
    "#000",
    "#F00",
    "#F80",
    "#efef00",
    "#0F0",
    "#0FF",
    "#00F",
    "#61a",
    "#ddd",
];

const colors2: string[] = [
    //
    "#247CFF",
    "#FFB45B",
    "#7424FF",
    "#A2FF6D",
    "#B6C3FF",
    "#F5FF92",
    "#B6B6B6",
    "#80DCFF",
    "#FF9292",
];

// arrOf(100, i => console.log(i));

async function run() {
    // await delay(1000);

    const words = "Add some color tags to your console logs !".split(" ");
    const tags = words.map((w, i) => logTag(w, colors[i]));

    tlog(...tags);

    const words2 = "App Auth Config Catalog Command System Service Proxy Context".split(" ");
    const tags2 = words2.map((w, i) => logTag(w, colors2[i]));

    tlog(...tags2);

    const appTag = logTag("app");
    console.log(...appTag, "starting");
}

setTimeout(run, 0);
