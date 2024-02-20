export const isNotEmptyHtml = (html: string): boolean => {
    return !!html && !!Object.assign(document.createElement('div'), { innerHTML: html }).textContent!.trim().length;
};