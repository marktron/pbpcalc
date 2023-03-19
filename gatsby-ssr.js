import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./src/components/globalStyle";
import Theme from "./src/components/theme";
import "react-tooltip/dist/react-tooltip.css";

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return (
    <ThemeProvider theme={Theme} {...props}>
      <GlobalStyle />
      {element}
    </ThemeProvider>
  );
};
