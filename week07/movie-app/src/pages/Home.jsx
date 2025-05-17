import { useState } from 'react';
import styled from 'styled-components';
import MovieList from '../components/MovieList';

const Header = styled.header`
  width: 100%;
  background: #181818;
  padding: 1.5rem 0 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: #ff3366;
  margin-left: 2rem;
  letter-spacing: 2px;
`;

const Nav = styled.nav`
  margin-right: 2rem;
  a {
    color: #fff;
    margin-left: 1.5rem;
    font-weight: 500;
    text-decoration: none;
    font-size: 1.1rem;
    &:hover {
      color: #ff3366;
    }
  }
`;

const MainTitle = styled.h1`
  color: #fff;
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
  background: ${({ active }) => (active ? '#ff3366' : '#232323')};
  color: #fff;
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
  }
`;

const PageBg = styled.div`
  min-height: 100vh;
  background: #111;
`;

function Home() {
  const [sort, setSort] = useState('like_count'); // 기본값: 좋아요순

  return (
    <PageBg>
      <Header>
        <Logo>Movies</Logo>
        <Nav>
          <a href="/">홈</a>
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
