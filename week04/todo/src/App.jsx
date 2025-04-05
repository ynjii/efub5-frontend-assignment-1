import React, { useState, useEffect } from "react";
import TodoTemplate from "./components/TodoTemplate";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  * {
    box-sizing: border-box;
  }
  body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    color: #2d3748;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.3s ease;
  }
  @media (max-width: 576px) {
    body {
      padding: 1rem;
    }
  }
`;

// 로컬 스토리지에서 todos를 가져오고, todos가 없으면 빈 배열을 기본값으로 설정
function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  // todos가 변경될 때마다 로컬 스토리지에 todos를 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <GlobalStyle />
      <TodoTemplate todos={todos} setTodos={setTodos} />
    </>
  );
}

export default App;
