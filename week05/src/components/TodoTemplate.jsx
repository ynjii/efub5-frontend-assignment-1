import React, { useState } from "react";
import styled from "styled-components";
import TodoHead from "./TodoHead";
import TodoList from "./TodoList";
import TodoCreate from "./TodoCreate";

const TodoTemplateBlock = styled.div`
  width: 420px;
  min-height: 650px;
  max-height: 700px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  background: #f7fafc;
  padding: 10px 0;
  border-top: 1px solid #edf2f7;
`;

const FilterButton = styled.button`
  background: ${(props) => (props.$active ? "#6366f1" : "transparent")};
  color: ${(props) => (props.$active ? "white" : "#4a5568")};
  font-size: 14px;
  font-weight: 500;
  padding: 6px 16px;
  border-radius: 20px;
  margin: 0 5px;
  box-shadow: ${(props) => (props.$active ? "0 2px 8px rgba(99, 102, 241, 0.3)" : "none")};
  &:hover {
    background: ${(props) => (props.$active ? "#6366f1" : "#edf2f7")};
  }
`;

function TodoTemplate({ todos, setTodos }) {
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
    return true;
  });

  return (
    <TodoTemplateBlock>
      <TodoHead todos={todos} />
      <FilterBar>
        <FilterButton $active={filter === 'all'} onClick={() => handleFilterChange('all')}>전체</FilterButton>
        <FilterButton $active={filter === 'active'} onClick={() => handleFilterChange('active')}>진행 중</FilterButton>
        <FilterButton $active={filter === 'completed'} onClick={() => handleFilterChange('completed')}>완료됨</FilterButton>
      </FilterBar>
      <TodoList todos={filteredTodos} setTodos={setTodos} filter={filter} />
      <TodoCreate todos={todos} setTodos={setTodos} />
    </TodoTemplateBlock>
  );
}

export default TodoTemplate;
