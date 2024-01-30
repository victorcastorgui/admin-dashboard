import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
   
   body{
    background-color: ${(props) => props.theme.background};
    font-family: 'Taviraj', serif;
    color: ${(props) => props.theme.text} ;
   }


`;

export default GlobalStyle;
