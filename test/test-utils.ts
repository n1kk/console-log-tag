export const arrOf = (n: number, init: (index: number) => any = _ => _) => {
    return Array.from({ length: n }, (v, i) => init(i));
};
export const randFrom = <T>(a: T[]) => {
    return a[rand(0, a.length)];
};
export const rand = (a: number, b?: number) =>
    b == undefined ? (Math.random() * a) >> 0 : (a + Math.random() * (b - a)) >> 0;
export const letters = arrOf(26, i => String.fromCharCode(i + 97));
export const word = (min?: number, max?: number) => {
    const size =
        min && max //
            ? rand(min, max)
            : min
            ? min
            : rand(5, 12);
    return arrOf(size, i => randFrom(letters)).join("");
};
export const words = (n: number) => arrOf(n, i => word());

export const delay = async (n: number) =>
    new Promise(res => {
        setTimeout(res, n);
    });
