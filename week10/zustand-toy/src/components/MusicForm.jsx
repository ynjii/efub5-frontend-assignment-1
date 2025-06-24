import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useFavoriteStore } from '../store/favoriteStore'
import { nanoid } from 'nanoid'

const spotifyGreen = '#1db954'

const Form = styled.form`
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
  background: #181818;
  border-radius: 16px;
  padding: 1.5rem 1rem 1.2rem 1rem;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.13);
  border: 1px solid #232323;
`

const Input = styled.input`
  padding: 0.85rem 1rem;
  border: 1.5px solid #282828;
  border-radius: 8px;
  font-size: 1rem;
  background: #232323;
  color: #fff;
  transition: border 0.2s;
  &:focus {
    border-color: ${spotifyGreen};
    outline: none;
    box-shadow: 0 0 0 2px #1db95433;
  }
  &::placeholder {
    color: #b3b3b3;
  }
`

const TextArea = styled.textarea`
  padding: 0.85rem 1rem;
  border: 1.5px solid #282828;
  border-radius: 8px;
  font-size: 1rem;
  background: #232323;
  color: #fff;
  resize: vertical;
  min-height: 60px;
  transition: border 0.2s;
  &:focus {
    border-color: ${spotifyGreen};
    outline: none;
    box-shadow: 0 0 0 2px #1db95433;
  }
  &::placeholder {
    color: #b3b3b3;
  }
`

const Button = styled.button`
  background: ${spotifyGreen};
  color: #191414;
  border: none;
  padding: 0.9rem 0;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.5rem;
  box-shadow: 0 2px 8px 0 rgba(30,185,84,0.13);
  transition: background 0.2s, transform 0.1s;
  &:hover {
    background: #1ed760;
    transform: translateY(-2px) scale(1.03);
  }
`

export default function MusicForm({ defaultValues = {}, isEdit = false, onFinish }) {
  const [title, setTitle] = useState(defaultValues.title || '')
  const [artist, setArtist] = useState(defaultValues.artist || '')
  const [url, setUrl] = useState(defaultValues.url || '')
  const [cover, setCover] = useState(defaultValues.cover || '')
  const [genre, setGenre] = useState(defaultValues.genre || '')
  const [year, setYear] = useState(defaultValues.year || '')
  const [note, setNote] = useState(defaultValues.note || '')

  const addItem = useFavoriteStore((s) => s.addItem)
  const updateItem = useFavoriteStore((s) => s.updateItem)
  const navigate = useNavigate()

  useEffect(() => {
    if (isEdit && !defaultValues.id) navigate('/favorites')
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEdit) {
      updateItem(defaultValues.id, { title, artist, url, cover, genre, year, note })
      onFinish ? onFinish() : navigate(`/favorites/${defaultValues.id}`)
    } else {
      addItem({ id: nanoid(), title, artist, url, cover, genre, year, note })
      setTitle(''); setArtist(''); setUrl(''); setCover(''); setGenre(''); setYear(''); setNote('')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input placeholder="앨범 커버 이미지 URL" value={cover} onChange={e => setCover(e.target.value)} />
      <Input placeholder="곡 제목 (필수)" value={title} onChange={e => setTitle(e.target.value)} required />
      <Input placeholder="아티스트 (필수)" value={artist} onChange={e => setArtist(e.target.value)} required />
      <Input type="url" placeholder="음원/뮤직비디오 URL (필수)" value={url} onChange={e => setUrl(e.target.value)} required />
      <Input placeholder="장르" value={genre} onChange={e => setGenre(e.target.value)} />
      <Input placeholder="발매년도" value={year} onChange={e => setYear(e.target.value)} />
      <TextArea rows={3} placeholder="메모 (선택)" value={note} onChange={e => setNote(e.target.value)} />
      <Button type="submit">{isEdit ? '수정 완료' : '추가하기'}</Button>
    </Form>
  )
}
