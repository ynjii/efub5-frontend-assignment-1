import React, { useState } from "react";
import styled from "styled-components";
import { MdDone, MdEdit, MdClose } from "react-icons/md";

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  margin: 8px 0;
  background: ${props => props.$done ? '#f8f7ff' : 'white'};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CheckCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${props => props.$done ? '#6366f1' : '#cbd5e1'};
  background: ${props => props.$done ? '#6366f1' : 'white'};
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  cursor: pointer;
  color: white;
  transition: all 0.2s;
  &:hover {
    border-color: #6366f1;
    transform: scale(1.1);
  }
`;

const Text = styled.div`
  flex: 1;
  font-size: 16px;
  color: ${props => props.$done ? '#a0aec0' : '#2d3748'};
  text-decoration: ${props => props.$done ? 'line-through' : 'none'};
  transition: color 0.2s;
  word-break: break-word;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color || '#cbd5e1'};
  font-size: 18px;
  background: transparent;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-left: 4px;
  transition: all 0.2s;
  &:hover {
    background: ${(props) => props.$hoverBg || "#f1f5f9"};
    color: ${(props) => props.$hoverColor || props.color || "#4a5568"};
  }
`;

const EditInput = styled.input`
  flex: 1;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #6366f1;
  outline: none;
  margin-right: 12px;
  padding: 8px 4px;
  color: #2d3748;
  background: transparent;
`;

// 휴지통 이모지 버튼
const DeleteButton = styled.button`
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: 4px;
  &:hover {
    transform: scale(1.1);
  }
`;

// props: todo (할 일 객체), setTodos (할 일 목록 업데이트 함수)
function TodoItem({ todo, setTodos }) {
  const { id, done, text } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const onToggle = () => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const onRemove = () => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const onEdit = () => {
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditText(text);
  };

  const onEditChange = (e) => {
    setEditText(e.target.value);
  };

  const onEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() === "") return;
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text: editText } : t));
    setIsEditing(false);
  };

  return (
    <TodoItemBlock $done={done}>
      <CheckCircle $done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      {isEditing ? (
        <form onSubmit={onEditSubmit} style={{ display: "flex", flex: 1 }}>
          <EditInput value={editText} onChange={onEditChange} placeholder="할 일을 입력하세요" />
          <ActionButton type="submit" color="#6366f1" hoverBg="#ede9fe" hoverColor="#4f46e5">
            <MdDone />
          </ActionButton>
          <ActionButton type="button" onClick={cancelEdit} color="#f43f5e" hoverBg="#fee2e2" hoverColor="#e11d48">
            <MdClose />
          </ActionButton>
        </form>
      ) : (
        <>
          <Text $done={done}>{text}</Text>
          <ActionButtons>
            {!done && (
              <ActionButton type="button" onClick={onEdit} color="#6366f1" $hoverBg="#ede9fe" $hoverColor="#4f46e5">
                <MdEdit />
              </ActionButton>
            )}
            {/* 휴지통 이모지 추가 */}
            <DeleteButton onClick={onRemove}>🗑️</DeleteButton>
          </ActionButtons>
        </>
      )}
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
