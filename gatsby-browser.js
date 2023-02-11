import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Theme from "./src/components/theme";
// const Layout = require("./src/components/layout")


const GlobalStyle = createGlobalStyle`
/*
  Josh's Custom CSS Reset
  https://www.joshwcomeau.com/css/custom-css-reset/
*/
  *, *::before, *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }
  html, body {
    height: 100%;
  }
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  input, button, textarea, select {
    font: inherit;
  }
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
  #root, #__next {
    isolation: isolate;
  }
  body {
    background: ${(props) => props.theme.page_background};
    margin: 0;
    padding: 0;
    color: ${(props) => props.theme.colors.gray_med};
    font-family: "Work Sans";
    font-size: 16px;
  }
`;

// Logs when the client route changes
export const onRouteUpdate = ({ location, prevLocation }) => {
  console.log("new pathname", location.pathname);
  console.log("old pathname", prevLocation ? prevLocation.pathname : null);
};

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  // return <Layout {...props}>{element}</Layout>
  return (
    <ThemeProvider theme={Theme} {...props}>
      <GlobalStyle />
      {element}
    </ThemeProvider>
  );
};