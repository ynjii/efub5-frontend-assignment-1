import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Segoe UI', 'Roboto', 'Noto Sans KR', Arial, sans-serif;
    background: #191414;
    color: #fff;
    min-height: 100vh;
  }
  a { text-decoration: none; color: inherit; }
`
