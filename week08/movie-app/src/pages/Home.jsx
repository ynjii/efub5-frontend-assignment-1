import { useState } from 'react';
import styled from 'styled-components';
import MovieList from '../components/MovieList';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';

const Header = styled.header`
  width: 100%;
  background: ${({ theme }) => theme.headerBg};
  padding: 1.5rem 0 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: ${({ theme }) => theme.headerText};
  margin-left: 2rem;
  letter-spacing: 2px;
`;

const Nav = styled.nav`
  margin-right: 2rem;
  display: flex;
  align-items: center;
  a {
    color: ${({ theme }) => theme.text};
    margin-left: 1.5rem;
    font-weight: 500;
    text-decoration: none;
    font-size: 1.1rem;
    &:hover {
      color: #ff3366;
    }
  }
`;

const ThemeToggleBtn = styled.button`
  background: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border: 1px solid #ff3366;
  border-radius: 20px;
  padding: 0.5em 1.2em;
  font-size: 1rem;
  margin-left: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #ff3366;
    color: #fff;
  }
`;

const MainTitle = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: 2.3rem;
  font-weight: 800;
  margin: 2rem 0 1rem 0;
  text-align: center;
  letter-spacing: 1px;
  background: none;
`;

const SortBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  background: none;
`;

const SortButton = styled.button`
  background: ${({ active, theme }) => (active ? '#ff3366' : theme.buttonBg)};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 20px;
  padding: 0.6em 1.5em;
  font-size: 1rem;
  margin: 0 0.5em;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ff3366;
    color: #fff;
  }
`;

const PageBg = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};
`;

function Home() {
  const [sort, setSort] = useState('like_count');
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <PageBg>
      <Header>
        <Logo>Movies</Logo>
        <Nav>
          <a href="/">홈</a>
          <ThemeToggleBtn onClick={() => dispatch(toggleTheme())}>
            {mode === 'dark' ? '라이트 모드' : '다크 모드'}
          </ThemeToggleBtn>
        </Nav>
      </Header>
      <MainTitle>인기 영화 둘러보기</MainTitle>
      <SortBar>
        <SortButton active={sort === 'like_count'} onClick={() => setSort('like_count')}>
          좋아요순
        </SortButton>
        <SortButton active={sort === 'rating'} onClick={() => setSort('rating')}>
          별점순
        </SortButton>
      </SortBar>
      <MovieList sort={sort} />
    </PageBg>
  );
}

export default Home;
