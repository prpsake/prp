module.exports = {
  content: ["./src/templates/*.{js,ts}"],
  theme: {
    fontFamily: {
      mono: "var(--template-font)",
    },
    extend: {
      width: {
        "page-left": "110mm"
      },
      colors: {
        "template-bg": "var(--template-bg)",
        "template-fg": "var(--template-fg)",
        "template-action-fg": "var(--template-action-fg)"
      },
      fontSize: {
        "3xs": [".5rem", {
          lineHeight: ".667rem"
        }],
        "2xs": [".667rem", {
          lineHeight: "0.889rem",
        }],
      }
    }
  },
  plugins: [],
}
