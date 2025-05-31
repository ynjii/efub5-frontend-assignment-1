import React, { useState } from "react";
import axiosInstance from "../libs/axiosInstance";
import { Container } from "../styles/CommonStyled";

export default function SignUpForm({ onSignUp }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
    university: "",
    studentId: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("회원가입 요청 데이터:", formData);
      const res = await axiosInstance.post("/members", formData);
      setMessage("✅ 회원가입 성공!");
      onSignUp(res.data); // 회원정보 상위로 전달
    } catch (err) {
      setMessage("❌ 회원가입 실패!");
      console.error(err, err.response?.data);
    }
  };

  return (
    <Container>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <label>
          이메일
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          비밀번호
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          닉네임
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          대학교
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          학번
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">회원가입</button>
      </form>

      {message && (
        <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{message}</p>
      )}
    </Container>
  );
}
