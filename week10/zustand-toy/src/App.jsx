import React from 'react'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import MusicCollectionPage from './pages/MusicCollectionPage'
import MusicDetailPage from './pages/MusicDetailPage'

const spotifyGreen = '#1db954'
const darkBg = '#191414'

const Nav = styled.nav`
  background: ${darkBg};
  padding: 1.1rem 0;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.12);
  border-bottom: 1.5px solid #232323;
`
const NavItem = styled(NavLink)`
  color: #fff;
  margin: 0 1.5rem;
  font-size: 1.18rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  transition: background 0.18s, color 0.18s;
  &.active { 
    color: ${spotifyGreen};
    background: #232323;
  }
  &:hover {
    color: ${spotifyGreen};
    background: #232323;
  }
`

export default function App() {
  return (
    <>
      <Nav>
        <NavItem to="/favorites" end>🎵 My Music Collection</NavItem>
      </Nav>
      <Routes>
        <Route path="/" element={<Navigate to="/favorites" replace />} />
        <Route path="/favorites" element={<MusicCollectionPage />} />
        <Route path="/favorites/:id" element={<MusicDetailPage />} />
        <Route path="*" element={<Navigate to="/favorites" replace />} />
      </Routes>
    </>
  )
}
