import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useFavoriteStore } from '../store/favoriteStore'

const List = styled.ul`
  margin-top: 2rem;
  display: grid;
  gap: 1rem;
  padding: 0;
  list-style: none;
`
const Item = styled.li`
  background: #fef9c3;
  padding: 1.1rem 1.5rem;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px 0 rgba(37, 99, 235, 0.07);
  border: 1px solid #e0e7ef;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 6px 24px 0 rgba(37, 99, 235, 0.13);
  }
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 1.08rem;
  color: #1e293b;
  strong {
    font-size: 1.13rem;
    color: #2563eb;
    font-weight: 700;
  }
  span {
    color: #10b981;
    font-weight: 600;
    font-size: 1.02rem;
  }
`
const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`
const Button = styled.button`
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 0.45rem 1.1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.15s;
  &:hover {
    background: #dc2626;
  }
`
const EditButton = styled(Link)`
  background: #3b82f6;
  color: #fff;
  padding: 0.45rem 1.1rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.15s;
  &:hover {
    background: #2563eb;
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

const Empty = styled.div`
  margin: 2.5rem 0;
  text-align: center;
  color: #64748b;
  font-size: 1.1rem;
`

export default function MusicList() {
  const items = useFavoriteStore((s) => s.items)
  const removeItem = useFavoriteStore((s) => s.removeItem)

  if (items.length === 0) return <Empty>등록된 곡이 없습니다.</Empty>

  return (
    <List>
      {items.map(({ id, title, artist, url }) => (
        <Item key={id}>
         <Info>
           <strong>{title}</strong>
           <span>{artist}</span>
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
