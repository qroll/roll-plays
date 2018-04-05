const hexToRGB = color => {
    const hex = color.replace(/#/, "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    return { r, g, b };
};

export const rgbToHex = (r, g, b) => {
    let r2 = r.toString(16);
    let g2 = g.toString(16);
    let b2 = b.toString(16);
    return "#" + r2 + g2 + b2;
};

export const getContrastColor = color => {
    let { r, g, b } = hexToRGB(color);

    let luma = [0.299 * r, 0.587 * g, 0.114 * b].reduce((a, b) => a + b) / 255;

    if (luma > 0.5)
        return "#000000"; // bright colors - black font
    else return "#ffffff"; // dark colors - white font
};

export const darken = color => {
    let { r, g, b } = hexToRGB(color);
    let [r2, g2, b2] = [r, g, b].map(a => Math.ceil(a * 0.8));

    return rgbToHex(r2, g2, b2);
};
