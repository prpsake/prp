/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,mjs}"],
  safelist: [":host"],
  corePlugins: [
    "preflight",
    "display",
    "flex",
    "flexDirection",
    "width",
    "height",
    "margin",
    "padding",
    "backgroundColor",
    "borderColor",
    "borderWidth",
    "borderStyle",
    "fill",
    "stroke",
    "textAlign",
    "fontFamily",
    "fontSize",
    "fontWeight",
    "textColor",
    "lineHeight",
  ],
  theme: {
    screens: {
      "print": {"raw": "print"},
    },
    spacing: {
      "5": "5mm",
    },
    width: fromArray("mm", [210, 148, 92, 87, 62, 52, 51, 46, 22]),
    height: fromArray("mm", [105, 95, 85, 56, 46, 22, 18, 14, 10, 7]),
    margin: {
      "line-7": "7pt",
      "line-9": "9pt",
      "line-11": "11pt"
    },
    colors: {
      black: "#000",
      white: "#fff",
    },
    borderWidth: {
      DEFAULT: "1pt"
    },
    borderStyle: {
      solid: "solid",
      dashed: "dashed",
      dotted: "dotted"
    },
    fill: {
      current: "currentColor",
    },
    stroke: {
      current: "currentColor",
    },
    fontFamily: {
      sans: ["LiberationSans", "Helvetica", "Arial", "sans-serif"]
    },
    fontSize: fromArray("pt", [6, 7, 8, 10, 11]),
    fontWeight: {
      normal: "400",
      bold: "700",
    },
    lineHeight: {
      "none": "1",
      ...fromArray("pt", [8, 9, 11, 13])
    },
  },
  variants: {},
  plugins: [],
}


function fromArray(unit, arr) {
  return Object.fromEntries(arr.map(x => [`${x}`, `${x}${unit}`]))
}

