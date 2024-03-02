export const toHex = function (rgb: string): string {
    return rgb.match(/\d+/gi)?.reduce((acc, color) => acc += Number(color).toString(16).padStart(2, '0'), '#') ?? rgb;
};