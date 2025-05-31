import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  gap: 0;
  margin-bottom: 32px;
  background: #f5f5f5;
  border-bottom: 2px solid #1976d2;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const TabButton = styled.button`
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  border-bottom: ${({ active }) => (active ? "4px solid #1976d2" : "none")};
  background: ${({ active }) => (active ? "#fff" : "#f5f5f5")};
  color: ${({ active }) => (active ? "#1976d2" : "#888")};
  border-radius: 10px 10px 0 0;
  font-size: 18px;
  cursor: pointer;
  padding: 16px 40px 12px 40px;
  border: none;
`;

export default function NavTabs({ tab, setTab }) {
  return (
    <Nav>
      <TabButton active={tab === "board"} onClick={() => setTab("board")}>
        게시판
      </TabButton>
      <TabButton active={tab === "post"} onClick={() => setTab("post")}>
        게시글
      </TabButton>
    </Nav>
  );
}