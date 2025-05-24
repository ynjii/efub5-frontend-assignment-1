import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  width: 220px;
  margin: 1.5rem 1rem;
  background: #181818;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 320px;
  object-fit: cover;
  background: #222;
`;

const Info = styled.div`
  padding: 1rem;
  color: #fff;
  text-align: center;
`;

const Title = styled.h4`
  margin: 0.5rem 0 0.2rem 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

function MovieCard({ movie }) {
  return (
    <Card>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
        <Poster src={movie.medium_cover_image} alt={movie.title} />
        <Info>
          <Title>{movie.title}</Title>
          <div style={{ fontSize: '0.95rem', color: '#bdbdbd' }}>{movie.year}</div>
        </Info>
      </Link>
    </Card>
  );
}

export default MovieCard;
