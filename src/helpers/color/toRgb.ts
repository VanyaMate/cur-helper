export const toRgb = function (hex: string): string {
    const value: string | undefined = hex.match(/\w+/)?.[0];
    if (!value) {
        return 'rgb(0, 0, 0)';
    }

    if (value.length === 3) {
        const colors = value.match(/./gi);
        if (colors) {
            const [ r, g, b ] = colors;
            return `rgb(${ parseInt(r + r, 16) }, ${ parseInt(g + g, 16) }, ${ parseInt(b + b, 16) })`;
        }

    } else if (value.length === 6) {
        const colors = value.match(/.{2}/gi);
        if (colors) {
            const [ r, g, b ] = colors;
            return `rgb(${ parseInt(r, 16) }, ${ parseInt(g, 16) }, ${ parseInt(b, 16) })`;
        }
    }

    return 'rgb(0, 0, 0)';
};