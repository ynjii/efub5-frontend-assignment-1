import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 16px 24px;
  overflow-y: auto;
  background: white;
  max-height: 400px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 32px 0;
  color: #a0aec0;
  font-size: 16px;
  p {
    margin: 0;
    margin-top: 12px;
  }
`;

const EmptyIcon = styled.div`
  font-size: 32px;
  margin-bottom: 16px;
  color: #cbd5e1;
`;
// 할 일 목록을 보여주는 컴포넌트
// todos: 할 일 목록 배열
function TodoList({ todos, setTodos, filter }) {
  const isEmpty = todos.length === 0;

  const getEmptyMessage = () => {
    if (filter === 'completed') {
      return {
        icon: "🎯",
        message: "완료한 할 일이 없습니다."
      };
    } else if (filter === 'active') {
      return {
        icon: "🎉",
        message: "모든 할 일을 완료했습니다!"
      };
    } else {
      return {
        icon: "📝",
        message: "할 일을 추가해보세요."
      };
    }
  };

  const { icon, message } = getEmptyMessage();

  return (
    <TodoListBlock>
      {isEmpty ? (
        <EmptyMessage>
          <EmptyIcon>{icon}</EmptyIcon>
          <p>{message}</p>
        </EmptyMessage>
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
        ))
      )}
    </TodoListBlock>
  );
}

export default TodoList;
