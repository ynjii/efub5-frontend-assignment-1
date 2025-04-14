import React, { useState } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
`;

const InsertForm = styled.form`
  background: #f7fafc;
  padding: 24px;
  border-top: 1px solid #edf2f7;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  font-size: 16px;
  outline: none;
  transition: all 0.3s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  &::placeholder {
    color: #a0aec0;
  }
  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
`;

const AddButton = styled.button`
  width: 40px;
  height: 40px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  background: #6366f1;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(99, 102, 241, 0.3);
  transition: all 0.3s;
  &:hover {
    background: #4f46e5;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }
  &:active {
    transform: scale(0.95);
  }
`;

function TodoCreate({ todos, setTodos }) {
  const [text, setText] = useState("");
  const [nextId, setNextId] = useState(1); // nextId를 상태로 관리

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    const newItem = { id: nextId, text: text, done: false }; // 새로운 todo 생성
    setTodos([...todos, newItem]); // todos 상태 업데이트
    setNextId(nextId + 1); // nextId 증가
    setText(""); // 입력 필드 초기화
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <InsertFormPositioner>
      <InsertForm onSubmit={onSubmit}>
        <Input onChange={handleChange} value={text} placeholder="할 일을 입력하세요" />
        <AddButton type="submit">
          <FaPlus />
        </AddButton>
      </InsertForm>
    </InsertFormPositioner>
  );
}

export default React.memo(TodoCreate);
