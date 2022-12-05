export const decimalToHex = (d: number | string, padding: number) => {
    var hex = Number(d).toString(16);

    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return "0x" + hex;
}