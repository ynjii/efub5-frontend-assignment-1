import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useFavoriteStore } from '../store/favoriteStore'

const spotifyGreen = '#1db954'

const List = styled.ul`
  margin-top: 2rem;
  display: grid;
  gap: 1.2rem;
  padding: 0;
  list-style: none;
`
const Item = styled.li`
  background: #181818;
  padding: 1.1rem 1.5rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.13);
  border: 1px solid #232323;
  transition: box-shadow 0.2s;
  gap: 1.2rem;
  &:hover {
    box-shadow: 0 6px 24px 0 rgba(30,185,84,0.13);
  }
`
const Cover = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 10px;
  object-fit: cover;
  background: #232323;
  border: 2px solid ${spotifyGreen};
`
const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 1.08rem;
  color: #fff;
  strong {
    font-size: 1.13rem;
    color: ${spotifyGreen};
    font-weight: 700;
  }
  .meta {
    color: #fff;
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
    color: #b3b3b3;
    font-size: 0.98rem;
  }
`
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
const Button = styled.button`
  background: transparent;
  color: ${spotifyGreen};
  border: 1.5px solid ${spotifyGreen};
  padding: 0.45rem 1.1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.15s, color 0.15s;
  &:hover {
    background: ${spotifyGreen};
    color: #191414;
  }
`
const EditButton = styled(Link)`
  background: ${spotifyGreen};
  color: #191414;
  padding: 0.45rem 1.1rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.15s, color 0.15s;
  &:hover {
    background: #1ed760;
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

const Empty = styled.div`
  margin: 2.5rem 0;
  text-align: center;
  color: #b3b3b3;
  font-size: 1.1rem;
`

export default function MusicList() {
  const items = useFavoriteStore((s) => s.items)
  const removeItem = useFavoriteStore((s) => s.removeItem)

  if (items.length === 0) return <Empty>등록된 곡이 없습니다.</Empty>

  return (
    <List>
      {items.map(({ id, title, artist, url, cover, genre, year }) => (
        <Item key={id}>
          <Cover src={cover || '/default-cover.png'} alt={title} />
          <Info>
            <strong>{title}</strong>
            <span className="meta">{artist}</span>
            {genre && <span className="genre">{genre}</span>}
            {year && <span className="year">{year}</span>}
            <MusicLink href={url} target="_blank" rel="noreferrer">음원/영상 바로가기</MusicLink>
          </Info>
          <ButtonGroup>
            <EditButton to={`/favorites/${id}`}>수정</EditButton>
            <Button onClick={() => removeItem(id)}>삭제</Button>
          </ButtonGroup>
        </Item>
      ))}
    </List>
  )
}
