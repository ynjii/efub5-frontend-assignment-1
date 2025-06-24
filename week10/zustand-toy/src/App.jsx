import React from 'react'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import MusicCollectionPage from './pages/MusicCollectionPage'
import MusicDetailPage from './pages/MusicDetailPage'

const Nav = styled.nav`
  background: #2563eb;
  padding: 1.1rem 0;
  box-shadow: 0 2px 8px 0 rgba(16, 185, 129, 0.07);
`
const NavItem = styled(NavLink)`
  color: #fff;
  margin: 0 1.5rem;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  &.active { 
    font-weight: bold; 
    text-decoration: underline; 
    text-underline-offset: 6px;
    color: #10b981;
  }
  transition: color 0.2s;
  &:hover {
    color: #a7f3d0;
  }
`

export default function App() {
  return (
    <>
      <Nav>
        <NavItem to="/favorites" end>🎵 뮤직 컬렉션</NavItem>
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
