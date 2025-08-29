/** @type {import('tailwindcss').Config} */
import preset from "@lynx-js/tailwind-preset";

export default {
  presets: [preset],
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
