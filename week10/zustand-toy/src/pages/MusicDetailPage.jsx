import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MusicForm from '../components/MusicForm'
import { useFavoriteStore } from '../store/favoriteStore'

const Container = styled.div`
  max-width: 600px;
  margin: 2.5rem auto;
  padding: 2.5rem 2rem 2rem 2rem;
  background: #f1f5f9;
  border-radius: 18px;
  box-shadow: 0 6px 32px 0 rgba(37, 99, 235, 0.1);
  border: 1.5px solid #e0e7ef;
`

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 800;
  color: #2563eb;
  margin-bottom: 1.2rem;
  letter-spacing: -1px;
  text-align: center;
`

const Info = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.2rem 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px 0 rgba(37, 99, 235, 0.07);
  border: 1px solid #e0e7ef;
  font-size: 1.08rem;
  color: #1e293b;
  strong {
    color: #2563eb;
    font-weight: 700;
  }
  span {
    color: #10b981;
    font-weight: 600;
    font-size: 1.02rem;
  }
`

const Hr = styled.hr`
  border: none;
  border-top: 1.5px solid #e5e7eb;
  margin: 2rem 0 1.5rem 0;
`

const BackButton = styled.button`
  margin-top: 1.5rem;
  background: #e0e7ef;
  color: #2563eb;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: #c7d2fe;
  }
`

const MusicLink = styled.a`
  color: #2563eb;
  font-weight: 600;
  text-decoration: underline;
  &:hover {
    color: #10b981;
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
      <Title>🎵 "{item.title}" 상세</Title>
      <Info>
        <div><strong>아티스트:</strong> <span>{item.artist}</span></div>
        <div><strong>음원/영상:</strong> <MusicLink href={item.url} target="_blank" rel="noreferrer">바로가기</MusicLink></div>
        <div><strong>메모:</strong> {item.note || <span style={{color:'#94a3b8'}}>메모 없음</span>}</div>
      </Info>
      <Hr />
      <h3 style={{color:'#2563eb', fontWeight:700, marginBottom:'1rem'}}>✏️ 편집하기</h3>
      <MusicForm 
       defaultValues={item} 
       isEdit 
       onFinish={() => navigate('/favorites')} 
     />
    </Container>
  )
}
