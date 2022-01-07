import { logtag, tlog } from "../src";
import { arrOf, word } from "./test-utils";

console.clear();

const data: [name: string, text: string][] = [
    ...arrOf(10, i => [`${i}`, "lorem ipsum ..."]), //
    ...arrOf(10, i => [`${String.fromCharCode(33 + i)}`, "lorem ipsum ..."]), //
    ...arrOf(10, i => ["test2 " + String.fromCharCode(33 + i), "lorem ipsum ..."]), //
    ...arrOf(20, i => ["test3 " + word(3, 30), "lorem ipsum ..."]), //
    ...arrOf(30, i => ["test4 " + word(3 + i), "lorem ipsum ..."]), //
];

data.forEach(([name, text]) => {
    tlog(logtag(name), text);
});

// tlog(logtag("asdasd"));
