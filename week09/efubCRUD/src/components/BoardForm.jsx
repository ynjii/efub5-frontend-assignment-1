import React, { useState } from "react";
import axiosInstance from "../libs/axiosInstance";

export default function BoardForm({ member, onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    notice: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        ownerId: Number(member.memberId),
      };
      const res = await axiosInstance.post("/boards", payload);
      setForm({ title: "", description: "", notice: "" });
      // 생성된 게시판 id를 alert로 안내
      alert(
        `게시판이 생성되었습니다!\n생성된 게시판 id: ${res.data.boardId}\n\n이 id를 복사해서 조회 창에 입력해보세요.`
      );
      if (onCreated) onCreated();
    } catch (err) {
      alert("게시판 생성 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="게시판 이름"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="설명"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        name="notice"
        placeholder="공지"
        value={form.notice}
        onChange={handleChange}
        required
      />
      <button type="submit">게시판 생성</button>
    </form>
  );
}
