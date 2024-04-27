import { Breakpoints } from "@mui/material/styles";
import colors, { darkModeColors } from "./colors";

declare module "@mui/material/styles" {
  interface CommonColors {
    lightBlue: string;
    lightGray: string;
  }
}

interface CustomBreakpoints extends Breakpoints {
  values: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    "2xl": number;
  };
}

const rootElement = document.getElementById("root");

const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    ...(mode === "light" ? colors : darkModeColors),
  },
  typography: {
    fontFamily: "Lato",
    fontSize: 14,
  },
  components: {
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
  } as CustomBreakpoints,
});

export default getDesignTokens;
