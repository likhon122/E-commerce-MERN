/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#e5e5e5",
        secondaryColor: "#f5f5f5",
        buttonColor: "#f53e32",
        textDefaultColor: "#2b2b2d",
        textPrimaryColor: "#ffffff",
        textSecondary: "#7a7a7a",
        cardHoverColor: "#db4444",
        borderColor: "#f53e32"
      }
    },
    fontFamily: {
      workSans: "Work Sans"
    },
   screens: {
      'sm': '540px',
      // => @media (min-width: 640px) { ... }

      'md': '668px',
      // => @media (min-width: 768px) { ... }

      'lg': '924px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1080px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: []
};
