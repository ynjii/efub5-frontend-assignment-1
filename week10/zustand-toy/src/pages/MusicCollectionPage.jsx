import React from 'react'
import styled from 'styled-components'
import MusicForm from '../components/MusicForm'
import MusicList from '../components/MusicList'

const cardBg = '#232323'
const spotifyGreen = '#1db954'

const Container = styled.div`
  max-width: 800px;
  margin: 2.5rem auto;
  padding: 2.5rem 2rem 2rem 2rem;
  background: ${cardBg};
  border-radius: 22px;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.25);
  border: 1.5px solid #282828;
`

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 900;
  color: ${spotifyGreen};
  margin-bottom: 2rem;
  letter-spacing: -1.5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  svg {
    font-size: 2.2rem;
    color: ${spotifyGreen};
  }
`

export default function MusicCollectionPage() {
  return (
    <Container>
      <Title>
        <span role="img" aria-label="music">🎵</span> 나만의 뮤직 컬렉션
      </Title>
      <MusicForm />
      <MusicList />
    </Container>
  )
}
