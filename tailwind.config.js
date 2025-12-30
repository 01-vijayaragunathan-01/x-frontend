import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        xdark: {
          primary: "#1D9BF0",
          secondary: "#16181C",

          "base-100": "#000000",   // 🔥 MAIN BACKGROUND
          "base-200": "#16181C",   // cards
          "base-300": "#1D1F23",

          "base-content": "#E7E9EA",

          neutral: "#16181C",
          info: "#1D9BF0",
          success: "#00BA7C",
          warning: "#FFD400",
          error: "#F4212E",

          "--border-color": "#2F3336",
          "--rounded-box": "9999px",
        },
      },
    ],
  },
};
