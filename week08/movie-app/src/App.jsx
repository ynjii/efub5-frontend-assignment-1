import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from './styles/theme';

function App() {
  const mode = useSelector((state) => state.theme.mode);

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
