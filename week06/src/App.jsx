import React, { useState, useEffect } from "react";
import TodoTemplate from "./components/TodoTemplate";
import { createGlobalStyle } from "styled-components";
import "./App.css";

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

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [testState, setTestState] = useState(0); // 임시 상태 추가

  const handleTestClick = () => {
    setTestState((prev) => prev + 1); // 테스트 버튼 클릭 시 상태 변경
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <GlobalStyle />
      <div>
        <TodoTemplate todos={todos} setTodos={setTodos} />
      </div>
    </>
  );
}

export default App;
