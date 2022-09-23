import { createGlobalStyle } from "styled-components";

import "@fontsource/roboto/300.css";

const GlobalStyle = createGlobalStyle`

  body {
    font-family: "Roboto", "Noto", sans-serif;
    font-weight: bold;
    font-size: 15px;
  }

  .clickable-text-hover {
    color: black;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
    :hover {
        color: #ffb17a;
    }
    cursor: pointer;
  }

  .complete-circle-info {
    list-style: none;
        padding-left: 0px;
        margin-top: 0px;
  }
`;

export default GlobalStyle;
