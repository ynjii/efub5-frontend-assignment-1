import React, { useState } from "react";
import axiosInstance from "../libs/axiosInstance";
import BoardForm from "./BoardForm";
import styled from "styled-components";

// 버튼 스타일 통일
const ActionButton = styled.button`
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover:not(:disabled) {
    background: #e3f0ff;
    color: #1976d2;
  }
  &:disabled {
    background: #eee;
    color: #aaa;
    cursor: not-allowed;
  }
`;

const DangerButton = styled(ActionButton)`
  color: #fff;
  background: #d32f2f;
  border: 1px solid #d32f2f;
  &:hover:not(:disabled) {
    background: #ff5252;
    color: #fff;
  }
`;

export default function BoardList({ member, onSelectBoard }) {
  const [inputId, setInputId] = useState("");
  const [board, setBoard] = useState(null);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    notice: "",
  });
  const [posts, setPosts] = useState([]);

  // 게시판 조회
  const fetchBoard = async () => {
    setError("");
    setBoard(null);
    setPosts([]);
    if (!inputId) {
      setError("boardId를 입력하세요.");
      return;
    }
    try {
      const res = await axiosInstance.get(`/boards/${inputId}`);
      setBoard(res.data);
      setEditForm({
        title: res.data.title,
        description: res.data.description,
        notice: res.data.notice,
      });
      if (onSelectBoard) onSelectBoard(res.data); // 게시판 선택 콜백
    } catch (err) {
      setError("게시판 조회 실패: " + (err.response?.data?.message || err.message));
    }
  };

  // 게시판 삭제
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axiosInstance.delete(`/boards/${inputId}`);
      setBoard(null);
      setPosts([]);
      setInputId("");
      alert("게시판이 삭제되었습니다.");
    } catch (err) {
      alert("게시판 삭제 실패: " + (err.response?.data?.message || err.message));
    }
  };

  // 게시판 수정
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        ...editForm,
        ownerId: Number(member.memberId),
      };
      await axiosInstance.put(`/boards/${inputId}`, body);
      setBoard({ ...board, ...editForm });
      setEditMode(false);
      alert("게시판이 수정되었습니다.");
    } catch (err) {
      alert("게시판 수정 실패: " + (err.response?.data?.message || err.message));
    }
  };

  // 게시판 내 게시글 전체 조회
  const fetchPosts = async () => {
    setPosts([]);
    try {
      const res = await axiosInstance.get(`/boards/${inputId}/posts`);
      setPosts(res.data);
    } catch (err) {
      alert("게시글 목록 조회 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h2 style={{ color: "#222" }}>게시판 생성</h2>
      <BoardForm member={member} />

      <hr style={{ margin: "32px 0" }} />

      <h2 style={{ color: "#222" }}>게시판 조회</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          type="number"
          placeholder="게시판 id 입력"
          value={inputId}
          onChange={e => setInputId(e.target.value)}
          style={{ flex: 1, padding: 8, fontSize: 15 }}
        />
        <ActionButton onClick={fetchBoard}>조회</ActionButton>
      </div>
      {error && <div style={{ color: "#d32f2f", marginBottom: 16 }}>{error}</div>}

      {board && (
        <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 20, marginBottom: 24 }}>
          {editMode ? (
            <form onSubmit={handleEdit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <input
                type="text"
                value={editForm.title}
                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                required
                placeholder="이름"
                style={{ fontSize: 15 }}
              />
              <input
                type="text"
                value={editForm.description}
                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                required
                placeholder="설명"
                style={{ fontSize: 15 }}
              />
              <input
                type="text"
                value={editForm.notice}
                onChange={e => setEditForm({ ...editForm, notice: e.target.value })}
                required
                placeholder="공지"
                style={{ fontSize: 15 }}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <ActionButton type="submit" style={{ flex: 1 }}>저장</ActionButton>
                <ActionButton type="button" style={{ flex: 1 }} onClick={() => setEditMode(false)}>취소</ActionButton>
              </div>
            </form>
          ) : (
            <>
              <div><b>게시판 ID:</b> <span style={{ color: "#1976d2" }}>{board.boardId}</span></div>
              <div><b>이름:</b> <span style={{ color: "#333" }}>{board.title}</span></div>
              <div><b>설명:</b> <span style={{ color: "#333" }}>{board.description}</span></div>
              <div><b>공지:</b> <span style={{ color: "#333" }}>{board.notice}</span></div>
              <div><b>ownerId:</b> <span style={{ color: "#888" }}>{board.ownerId}</span></div>
              <div><b>생성일:</b> <span style={{ color: "#888" }}>{board.createdDate}</span></div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <ActionButton onClick={() => setEditMode(true)} style={{ flex: 1 }}>수정</ActionButton>
                <DangerButton onClick={handleDelete} style={{ flex: 1 }}>삭제</DangerButton>
                <ActionButton onClick={fetchPosts} style={{ flex: 1 }}>게시글 전체 조회</ActionButton>
              </div>
            </>
          )}
        </div>
      )}

      {posts.length > 0 && (
        <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16, marginBottom: 24 }}>
          <h3 style={{ marginTop: 0, color: "#1976d2" }}>게시판 내 게시글 목록</h3>
          <ul>
            {posts.map(post => (
              <li key={post.postId || post.id}>
                <b style={{ color: "#222" }}>{post.title}</b> <span style={{ color: "#555" }}>- {post.content}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: "2rem", color: "#888" }}>
        게시판을 생성하면 생성된 <b>게시판 id</b>가 안내됩니다.<br />
        그 id를 위 입력창에 넣고 조회, 수정, 삭제, 게시글 전체 조회를 해보세요!
      </div>
    </div>
  );
}