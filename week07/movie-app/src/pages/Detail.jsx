import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import styled from 'styled-components';

const PageBg = styled.div`
  min-height: 100vh;
  background: #111;
  padding-bottom: 3rem;
`;

const PageTitle = styled.h1`
  width: 100%;
  text-align: center;
  color: #ff3366;
  font-size: 2.5rem;
  font-weight: 800;
  margin-top: 2rem;
  margin-bottom: 2.5rem;
  letter-spacing: 1px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #181818;
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
  padding: 3rem 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Poster = styled.img`
  width: 320px;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
  margin-right: 2.5rem;
  background: #222;
`;

const Info = styled.div`
  max-width: 600px;
  color: #fff;
`;

const Title = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 2.2rem;
  font-weight: 700;
`;

const Desc = styled.p`
  font-size: 1.15rem;
  line-height: 1.7;
  color: #e0e0e0;
`;

const Tag = styled.span`
  display: inline-block;
  background: #4f46e5;
  color: #fff;
  border-radius: 8px;
  padding: 0.3em 0.8em;
  margin: 0.2em 0.5em 0.2em 0;
  font-size: 0.95rem;
`;

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    api.get(`/movie_details.json?movie_id=${id}`)
      .then(res => setMovie(res.data.data.movie));
  }, [id]);

  if (!movie) return (
    <PageBg>
      <Wrapper>
        <div style={{ color: '#fff' }}>영화 정보를 불러오는 중...</div>
      </Wrapper>
    </PageBg>
  );

  return (
    <PageBg>
      <PageTitle>영화 상세 정보</PageTitle>
      <Wrapper>
        <Poster src={movie.medium_cover_image} alt={movie.title} />
        <Info>
          <Title>
            {movie.title} <span style={{ fontSize: '1.1rem', color: '#bdbdbd' }}>({movie.year})</span>
          </Title>
          <div style={{ marginBottom: '1rem' }}>
            {movie.genres && movie.genres.map(genre => (
              <Tag key={genre}>{genre}</Tag>
            ))}
          </div>
          <Desc>{movie.description_full || '설명이 없습니다.'}</Desc>
          <div style={{ marginTop: '1.5rem', color: '#bdbdbd', fontSize: '1rem' }}>
            평점: <b>{movie.rating}</b> / 10 &nbsp;|&nbsp; 좋아요: <b>{movie.like_count}</b>
          </div>
        </Info>
      </Wrapper>
    </PageBg>
  );
}

export default Detail;
