import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
    transition: background 0.3s, color 0.3s;
  }
`;

export default GlobalStyle;