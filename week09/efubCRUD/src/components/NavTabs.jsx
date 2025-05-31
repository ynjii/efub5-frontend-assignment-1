import React from "react";

export default function NavTabs({ tab, setTab }) {
  return (
    <nav
      style={{
        display: "flex",
        gap: 16,
        marginBottom: 32,
        background: "#f5f5f5",
        padding: "16px 0 16px 32px",
        borderBottom: "1px solid #ddd",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <button
        onClick={() => setTab("board")}
        style={{
          fontWeight: tab === "board" ? "bold" : "normal",
          borderBottom: tab === "board" ? "2px solid #333" : "none",
          background: "none",
          border: "none",
          fontSize: 18,
          cursor: "pointer",
          color: tab === "board" ? "#333" : "#888",
          padding: "8px 24px",
        }}
      >
        게시판
      </button>
      <button
        onClick={() => setTab("post")}
        style={{
          fontWeight: tab === "post" ? "bold" : "normal",
          borderBottom: tab === "post" ? "2px solid #333" : "none",
          background: "none",
          border: "none",
          fontSize: 18,
          cursor: "pointer",
          color: tab === "post" ? "#333" : "#888",
          padding: "8px 24px",
        }}
      >
        게시글
      </button>
    </nav>
  );
}