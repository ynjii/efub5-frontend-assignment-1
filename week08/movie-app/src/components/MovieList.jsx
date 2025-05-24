import styled from 'styled-components';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import MovieCard from './MovieCard';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem 0;
  background: #111;
  min-height: 100vh;
`;

function MovieList({ sort }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get(`/list_movies.json?sort_by=${sort}`)
      .then((res) => setMovies(res.data.data.movies || []));
  }, [sort]);

  return (
    <Container>
      {movies.length === 0 ? (
        <p style={{ color: '#fff', fontSize: '1.2rem' }}>영화 데이터를 불러오는 중</p>
      ) : (
        movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      )}
    </Container>
  );
}

export default MovieList;
