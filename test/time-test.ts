import { delay, tlog } from "./test-utils";
import { logTag, mergeTagsInArgs, taggedLogger } from "../src";

console.clear();

const t = (t: string, c?: string, b?: string) => logTag(t, { background: c, border: b });

const app = taggedLogger("App", { bg: "#7424FF" });
const conf = app.childLogger("Preferences", { bg: "#DB7700" });
const login = app.childLogger("Auth", { bg: "#E912FF" });
const set = app.childLogger("Settings", { bg: "#37FFC8" });
const adm = set.childLogger("Admin", { bg: "#d82366", logFn: console.debug });

const entries: [delay: number, fn: Function, ...rest: any[]][] = [
    //
    [200, app, "starting"],
    [800, app, "loading dependencies"],
    [200, conf, "reading config"],
    [300, conf, "applying preferences"],
    [100, app, "initialized"],
    [100, login, "reading credentials"],
    [800, login, "requesting authorization ticket"],
    [100, login, "ticket retrieved"],
    [100, app, "logged in"],
    [500, set, "Configuring"],
    [800, set, "Loading preferences"],
    [800, adm, "Checking admin privileges"],
    [800, adm, "Role: Moderator"],
    [500, app, "rendering"],

    //
    // [500, tlog, "..."],
    // [500, tlog, "...."],
    // [500, tlog, "....."],
    //

    // [1000, tlog, t("(•_•)", "#00FF2E"), "Hello"],
    // [1500, tlog, t("(゜_゜)", "#DBD200"), "Hi"],
    // [1000, tlog, t("( •_•)>⌐■-■", "#FF9737"), "oh, what's this?"],
    // [800, tlog, t("(⌐■_■)", "#FF4B12"), "hmmm..."],
    // [1000, tlog, t("ԅ(≖‿≖ԅ)", "#FF5924"), "oh yeah"],
    // [500, tlog, t("٩(≖‿≖)۶", "#247CFF"), "..."],
    // [500, tlog, t("(◞≖‿≖)ᴖ", "#14FF00"), "..."],
    // [500, tlog, t("(੭≖‿≖)੭", "#37FFE7"), "..."],
    // [500, tlog, t("ᕦ(≖‿≖)ᕤ", "#FFC224"), "..."],
    // [500, tlog, t("ᕙ(⇀‸↼‶)ᕗ", "#FF007A"), "..."],
    // [500, tlog, t("ᕦ(⩾﹏⩽)ᕥ", "#AF49FF"), "..."],
    // [500, tlog, t("ᕙ(꒡⌓꒡)ᕗ", "#CCFF00"), "..."],
    // [1000, tlog, t("ヽ( ò̀ㅂó́)ﾉ", "#000000"), "what's going on here?"],
    // [800, tlog, t("(ノ ゜Д゜)ノ ︵ ┻━┻", "#FFF624"), "tables be flipping"],
    // [500, tlog, t("(/¯◡ ‿ ◡)/¯ ~ ┻━┻", "#FFC224"), "yeah baby, flipping"],
    // [1000, tlog, t("┬─┬ ノ( ゜-゜ノ)", "#470080"), "nonono, no flipping!"],
    // [500, tlog, t("(/¯ಠ_ಠ)/¯ ~ ┻━┻", "#FF4B12"), "flip"],
    // [1000, tlog, t("┬──┬ ノ(ò_óノ)", "#001AA4"), "no flip!"],
    // [800, tlog, t("(ノಠ益ಠ)ノ彡┻━┻", "#FF1212"), "FLIP!"],
    // [1200, tlog, t("(⊙＿⊙')", "#808080"), "....."],
    // [1000, tlog, t("¯\\_(ツ)_/¯", "#37B7FF"), "oh well... "],
    //
    [300, tlog, "..."],
    [300, tlog, "...."],
    [300, tlog, "....."],
    [300, tlog, "......"],
    [300, tlog, "......."],
    [300, tlog, "........"],
    [300, tlog, "........."],
    [300, tlog, ".........."],
    [300, tlog, "..........."],
    [300, tlog, "............"],
    [300, tlog, "............."],
];

async function run() {
    tlog("...");
    tlog("....");
    tlog(".....");
    tlog("......");
    tlog(".......");
    tlog("........");
    tlog(".........");
    tlog("..........");
    tlog("...........");
    tlog("............");
    tlog(".............");

    await delay(300);

    for (const [ms, fn, ...args] of entries) {
        fn(...args);
        await delay(ms);
    }
    // for (const [ms, fn, ...args] of entries) {
    //     fn(...args);
    //     await delay(ms);
    // }
}

setTimeout(run, 1000);
