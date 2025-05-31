import React, { useState } from "react";
import axiosInstance from "../libs/axiosInstance";

export default function PostForm({ member, board, onCreated }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    anonymous: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!board) {
      alert("게시판을 먼저 선택하거나 조회하세요.");
      return;
    }
    try {
      await axiosInstance.post("/posts", {
        ...form,
        anonymous: Boolean(form.anonymous),
        writerId: member.memberId,
        boardId: board.boardId ?? board.id,
      });
      setForm({ title: "", content: ""});
      if (onCreated) onCreated();
    } catch (err) {
      alert("게시글 작성 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <input
        name="title"
        placeholder="제목"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="content"
        placeholder="내용"
        value={form.content}
        onChange={handleChange}
        required
      />
      <button type="submit">작성</button>
    </form>
  );
}