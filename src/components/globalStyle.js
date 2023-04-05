import {createGlobalStyle } from "styled-components";
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
    font-family: "Work Sans", sans-serif;
    font-size: 16px;
    @media print {
     font-size: 10pt;
    }
  }
`;

export default GlobalStyle;
