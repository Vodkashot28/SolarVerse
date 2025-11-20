import {
    r as o
} from "./ton-ZF5igaW4.js";
const i = a => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
    h = (...a) => a.filter((t, c, r) => !!t && r.indexOf(t) === c).join(" ");
var m = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
const x = o.forwardRef(({
    color: a = "currentColor",
    size: t = 24,
    strokeWidth: c = 2,
    absoluteStrokeWidth: r,
    className: k = "",
    children: y,
    iconNode: s,
    ...n
}, d) => o.createElement("svg", {
    ref: d,
    ...m,
    width: t,
    height: t,
    stroke: a,
    strokeWidth: r ? Number(c) * 24 / Number(t) : c,
    className: h("lucide", k),
    ...n
}, [...s.map(([l, p]) => o.createElement(l, p)), ...Array.isArray(y) ? y : [y]]));
const e = (a, t) => {
    const c = o.forwardRef(({
        className: r,
        ...k
    }, y) => o.createElement(x, {
        ref: y,
        iconNode: t,
        className: h(`lucide-${i(a)}`, r),
        ...k
    }));
    return c.displayName = `${a}`, c
};
const M = e("Award", [
    ["path", {
        d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
        key: "1yiouv"
    }],
    ["circle", {
        cx: "12",
        cy: "8",
        r: "6",
        key: "1vp47v"
    }]
]);
const w = e("BookOpen", [
    ["path", {
        d: "M12 7v14",
        key: "1akyts"
    }],
    ["path", {
        d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
        key: "ruj8y"
    }]
]);
const u = e("CircleCheck", [
    ["circle", {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
    }],
    ["path", {
        d: "m9 12 2 2 4-4",
        key: "dzmm74"
    }]
]);
const f = e("Circle", [
    ["circle", {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
    }]
]);
const g = e("Coins", [
    ["circle", {
        cx: "8",
        cy: "8",
        r: "6",
        key: "3yglwk"
    }],
    ["path", {
        d: "M18.09 10.37A6 6 0 1 1 10.34 18",
        key: "t5s6rm"
    }],
    ["path", {
        d: "M7 6h1v4",
        key: "1obek4"
    }],
    ["path", {
        d: "m16.71 13.88.7.71-2.82 2.82",
        key: "1rbuyh"
    }]
]);
const C = e("Gamepad2", [
    ["line", {
        x1: "6",
        x2: "10",
        y1: "11",
        y2: "11",
        key: "1gktln"
    }],
    ["line", {
        x1: "8",
        x2: "8",
        y1: "9",
        y2: "13",
        key: "qnk9ow"
    }],
    ["line", {
        x1: "15",
        x2: "15.01",
        y1: "12",
        y2: "12",
        key: "krot7o"
    }],
    ["line", {
        x1: "18",
        x2: "18.01",
        y1: "10",
        y2: "10",
        key: "1lcuu1"
    }],
    ["path", {
        d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
        key: "mfqc10"
    }]
]);
const b = e("Gift", [
    ["rect", {
        x: "3",
        y: "8",
        width: "18",
        height: "4",
        rx: "1",
        key: "bkv52"
    }],
    ["path", {
        d: "M12 8v13",
        key: "1c76mn"
    }],
    ["path", {
        d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",
        key: "6wjy6b"
    }],
    ["path", {
        d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
        key: "1ihvrl"
    }]
]);
const A = e("Lock", [
    ["rect", {
        width: "18",
        height: "11",
        x: "3",
        y: "11",
        rx: "2",
        ry: "2",
        key: "1w4ew1"
    }],
    ["path", {
        d: "M7 11V7a5 5 0 0 1 10 0v4",
        key: "fwvmzm"
    }]
]);
const L = e("Medal", [
    ["path", {
        d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
        key: "143lza"
    }],
    ["path", {
        d: "M11 12 5.12 2.2",
        key: "qhuxz6"
    }],
    ["path", {
        d: "m13 12 5.88-9.8",
        key: "hbye0f"
    }],
    ["path", {
        d: "M8 7h8",
        key: "i86dvs"
    }],
    ["circle", {
        cx: "12",
        cy: "17",
        r: "5",
        key: "qbz8iq"
    }],
    ["path", {
        d: "M12 18v-2h-.5",
        key: "fawc4q"
    }]
]);
const q = e("Star", [
    ["polygon", {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
        key: "8f66p6"
    }]
]);
const H = e("Target", [
    ["circle", {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay"
    }],
    ["circle", {
        cx: "12",
        cy: "12",
        r: "6",
        key: "1vlfrh"
    }],
    ["circle", {
        cx: "12",
        cy: "12",
        r: "2",
        key: "1c9p78"
    }]
]);
const z = e("Trophy", [
    ["path", {
        d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6",
        key: "17hqa7"
    }],
    ["path", {
        d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18",
        key: "lmptdp"
    }],
    ["path", {
        d: "M4 22h16",
        key: "57wxv0"
    }],
    ["path", {
        d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",
        key: "1nw9bq"
    }],
    ["path", {
        d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",
        key: "1np0yb"
    }],
    ["path", {
        d: "M18 2H6v7a6 6 0 0 0 12 0V2Z",
        key: "u46fv3"
    }]
]);
const B = e("Users", [
    ["path", {
        d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
        key: "1yyitq"
    }],
    ["circle", {
        cx: "9",
        cy: "7",
        r: "4",
        key: "nufk8"
    }],
    ["path", {
        d: "M22 21v-2a4 4 0 0 0-3-3.87",
        key: "kshegd"
    }],
    ["path", {
        d: "M16 3.13a4 4 0 0 1 0 7.75",
        key: "1da9ce"
    }]
]);
const G = e("X", [
    ["path", {
        d: "M18 6 6 18",
        key: "1bl5f8"
    }],
    ["path", {
        d: "m6 6 12 12",
        key: "d8bk6v"
    }]
]);
export {
    M as A, w as B, u as C, b as G, A as L, L as M, q as S, z as T, B as U, G as X, H as a, f as b, g as c, C as d
};
