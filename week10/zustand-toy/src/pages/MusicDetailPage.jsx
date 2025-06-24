import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MusicForm from '../components/MusicForm'
import { useFavoriteStore } from '../store/favoriteStore'

const spotifyGreen = '#1db954'
const darkBg = '#191414'
const cardBg = '#232323'
const border = '#282828'
const textMain = '#fff'
const textSub = '#b3b3b3'

const Container = styled.div`
  max-width: 600px;
  margin: 2.5rem auto;
  padding: 2.5rem 2rem 2rem 2rem;
  background: ${cardBg};
  border-radius: 22px;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.25);
  border: 1.5px solid ${border};
`

const Cover = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 18px;
  object-fit: cover;
  background: #222;
  border: 2px solid ${spotifyGreen};
  display: block;
  margin: 0 auto 1.5rem auto;
  box-shadow: 0 4px 32px 0 rgba(30,185,84,0.12);
`

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: ${spotifyGreen};
  margin-bottom: 1.2rem;
  letter-spacing: -1px;
  text-align: center;
`

const Info = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.2rem 1rem;
  background: #181818;
  border-radius: 14px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);
  border: 1px solid ${border};
  font-size: 1.08rem;
  color: ${textMain};
  strong {
    color: ${spotifyGreen};
    font-weight: 700;
  }
  .meta {
    color: ${textMain};
    font-weight: 600;
    font-size: 1.02rem;
    margin-right: 0.7rem;
  }
  .genre {
    color: #f59e42;
    font-size: 0.98rem;
    margin-right: 0.7rem;
  }
  .year {
    color: ${textSub};
    font-size: 0.98rem;
  }
`

const Hr = styled.hr`
  border: none;
  border-top: 1.5px solid ${border};
  margin: 2rem 0 1.5rem 0;
`

const BackButton = styled.button`
  margin-top: 1.5rem;
  background: transparent;
  color: ${spotifyGreen};
  border: 1.5px solid ${spotifyGreen};
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  &:hover {
    background: ${spotifyGreen};
    color: #191414;
  }
`

const MusicLink = styled.a`
  color: ${spotifyGreen};
  font-weight: 600;
  text-decoration: underline;
  &:hover {
    color: #fff;
  }
`

const PlayButton = styled.a`
  display: inline-block;
  margin: 1rem auto 0 auto;
  background: ${spotifyGreen};
  color: #191414;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 50px;
  padding: 0.8rem 2.2rem;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 2px 8px 0 rgba(30,185,84,0.15);
  transition: background 0.2s, transform 0.1s;
  &:hover {
    background: #1ed760;
    transform: translateY(-2px) scale(1.03);
  }
`

export default function MusicDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = useFavoriteStore((s) => s.items.find((i) => i.id === id))

  if (!item) {
    return (
      <Container>
        <Info>곡을 찾을 수 없습니다.</Info>
        <BackButton onClick={() => navigate('/favorites')}>목록으로</BackButton>
      </Container>
    )
  }

  return (
    <Container>
      <Cover src={item.cover || '/default-cover.png'} alt={item.title} />
      <Title>🎵 {item.title}</Title>
      <Info>
        <div><strong>아티스트:</strong> <span className="meta">{item.artist}</span></div>
        {item.genre && <div><strong>장르:</strong> <span className="genre">{item.genre}</span></div>}
        {item.year && <div><strong>발매년도:</strong> <span className="year">{item.year}</span></div>}
        <div><strong>음원/영상:</strong> <MusicLink href={item.url} target="_blank" rel="noreferrer">바로가기</MusicLink></div>
        <div><strong>메모:</strong> {item.note || <span style={{color:'#94a3b8'}}>메모 없음</span>}</div>
      </Info>
      <PlayButton href={item.url} target="_blank" rel="noreferrer">▶️ 재생하기</PlayButton>
      <Hr />
      <h3 style={{color:spotifyGreen, fontWeight:700, marginBottom:'1rem'}}>✏️ 편집하기</h3>
      <MusicForm 
       defaultValues={item} 
       isEdit 
       onFinish={() => navigate('/favorites')} 
     />
    </Container>
  )
}
