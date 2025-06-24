import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Segoe UI', Roboto, sans-serif;
    background: #f9fafb;
    color: #1f2937;
  }
  a { text-decoration: none; color: inherit; }
`
