import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useFavoriteStore } from '../store/favoriteStore'
import { nanoid } from 'nanoid'

const Form = styled.form`
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
  background: #fff;
  border-radius: 14px;
  padding: 1.5rem 1rem 1.2rem 1rem;
  box-shadow: 0 2px 12px 0 rgba(16, 185, 129, 0.07);
  border: 1px solid #e0e7ef;
`

const Input = styled.input`
  padding: 0.85rem 1rem;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: #f9fafb;
  transition: border 0.2s;
  &:focus {
    border-color: #10b981;
    outline: none;
    box-shadow: 0 0 0 2px #10b98122;
  }
`

const TextArea = styled.textarea`
  padding: 0.85rem 1rem;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: #f9fafb;
  resize: vertical;
  min-height: 60px;
  transition: border 0.2s;
  &:focus {
    border-color: #10b981;
    outline: none;
    box-shadow: 0 0 0 2px #10b98122;
  }
`

const Button = styled.button`
  background: linear-gradient(90deg, #2563eb 60%, #10b981 100%);
  color: #fff;
  border: none;
  padding: 0.9rem 0;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  box-shadow: 0 2px 8px 0 rgba(16, 185, 129, 0.08);
  transition: background 0.2s, transform 0.1s;
  &:hover {
    background: linear-gradient(90deg, #1e40af 60%, #059669 100%);
    transform: translateY(-2px) scale(1.03);
  }
`

export default function MusicForm({ defaultValues = {}, isEdit = false, onFinish }) {
  const [title, setTitle] = useState(defaultValues.title || '')
  const [artist, setArtist] = useState(defaultValues.artist || '')
  const [url, setUrl] = useState(defaultValues.url || '')
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
      updateItem(defaultValues.id, { title, artist, url, note })
      onFinish ? onFinish() : navigate(`/favorites/${defaultValues.id}`)
    } else {
      addItem({ id: nanoid(), title, artist, url, note })
      setTitle(''); setArtist(''); setUrl(''); setNote('')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="곡 제목 (필수)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        placeholder="아티스트 (필수)"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
      />
      <Input
        type="url"
        placeholder="음원/뮤직비디오 URL (필수)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <TextArea
        rows={3}
        placeholder="메모 (선택)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <Button type="submit">{isEdit ? '수정 완료' : '추가하기'}</Button>
    </Form>
  )
}
