/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        "action-bg": "var(--action-bg)",
        "action-hover-bg": "var(--action-hover-bg)"
      }
    }
  },
  plugins: [],
}
