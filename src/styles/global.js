import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        @media(max-width: 1120px){
            font-size: 97.75%;
        }

        @media(max-width: 720px){
            font-size: 87.5%;
        }
    }

    body {
        font-size: 14px;
        background-color: #EFEFEF;
    }

    body, button, input {
        font-family: sans-serif;
    }

    button {
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    [disabled]{
        cursor: not-allowed;
        opacity: 0.7;
    }
`