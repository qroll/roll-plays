import { hexToRGB } from "src/utils/color";

export const GRAY = {
    LIGHTEST: "#EEEEEE",
    LIGHTER: "#E0E0E0",
    LIGHT: "#BEBEBE",
    MEDIUM: "#9E9E9E",
    DARK: "#757575",
    DARKER: "#424242",
    DARKEST: "#212121"
};

export const ACCENT = {
    PRIMARY_MUTED: "#F07241",
    PRIMARY: "#E34234",
    SECONDARY: "#33516E"
};

export const WHITE = "#FFFFFF";

export const FONT_MAIN = `"Roboto", sans-serif`;
export const FONT_TITLE = `"Roboto Condensed", serif`;

export const RGBA = (color, opacity = 1) => {
    let { r, g, b } = hexToRGB(color);
    return `rgba(${r},${g},${b},${opacity})`;
};
