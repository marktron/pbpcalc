import React from "react";
import { ThemeProvider } from "styled-components";
import Theme from "./src/components/theme";
import GlobalStyle from "./src/components/globalStyle";
import "react-tooltip/dist/react-tooltip.css";

// Logs when the client route changes
export const onRouteUpdate = ({ location, prevLocation }) => {
  console.log("new pathname", location.pathname);
  console.log("old pathname", prevLocation ? prevLocation.pathname : null);
};

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return (
    <ThemeProvider theme={Theme} {...props}>
      <GlobalStyle />
      {element}
    </ThemeProvider>
  );
};
