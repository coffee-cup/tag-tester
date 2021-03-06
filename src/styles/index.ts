import { system } from "@theme-ui/presets";
import { Theme } from "theme-ui";

const heading = {
  fontFamily: "heading",
  lineHeight: "heading",
  fontWeight: "heading",
};

const font = [
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Oxygen-Sans",
  "Ubuntu",
  "Cantarell",
  "Helvetica Neue",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
].join(",");

const theme: Theme = {
  ...system,
  colors: {
    text: "#333",
    background: "white",
    primary: "#045aff",
    secondary: "#a6ffcb",
    accent: "#12d8fa",
    muted: "#eff0f6",
    border: "#b0b0b0",
    grey: {
      400: "#a2a2a2",
      500: "grey",
    },
    error: "red",
  },
  breakpoints: ["46em", "52em", "64em"],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: font,
    heading: font,
    monospace: "Consolas, Liberation Mono, Menlo, Courier, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  sizes: {
    container: "60em",
    largeContainer: "90em",
    measure: "32em",
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  links: {
    none: {
      color: "currentColor",
      fontSize: 1,
      textDecoration: "underline",

      "&:hover": {
        bg: "transparent",
      },
    },
  },
  styles: {
    ...system.styles,
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
      p: {
        fontSize: 2,
      },
      h1: {
        ...heading,
        fontSize: [6, 7],
      },
      h2: {
        ...heading,
        fontSize: [4, 5],
      },
      h3: {
        ...heading,
        fontSize: 3,
      },
      h4: {
        ...heading,
        fontSize: 2,
      },
      h5: {
        ...heading,
        fontSize: 1,
      },
      h6: {
        ...heading,
        fontSize: 0,
      },
      em: {
        fontStyle: "normal",
        fontWeight: "bold",
      },
    },
    a: {
      color: "text",
      textDecoration: "underline",
      transition: "all 250ms ease-in-out",
      cursor: "pointer",

      "&:hover": {
        bg: "primary",
        color: "white",
      },
    },
    buttons: {
      primary: {
        color: "orange",
        bg: "primary",
        transition: "background-color 250ms ease-in-out",
        "&:hover": {
          bg: "text",
        },
      },
    },
    p: {
      code: {
        p: "2px",
        borderRadius: "4px",
      },
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      backgroundColor: "muted",
      p: 2,
      borderRadius: "4px",
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    tr: {},
    th: {
      textAlign: "left",
      pb: 1,
      pl: 2,
    },
    td: {
      textAlign: "left",
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: "border",
      p: 2,
    },
    blockquote: {
      mt: 0,
      mx: 0,
      py: 0,
      pr: 0,
      pl: 3,
      borderLeft: "solid 4px hsla(0,0%,0%,0.13)",
      color: "hsla(0,0%,0%,0.53)",
    },
    ul: {
      listStyle: "none",
      pl: 0,
    },
    li: {
      pb: 1,
    },
  },
};

export default theme;
