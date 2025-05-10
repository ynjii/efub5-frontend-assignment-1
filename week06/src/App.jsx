import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TodoTemplate from "./components/TodoTemplate";
import TimeWeatherPage from "./pages/TimeWeatherPage"; 
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
    flex-direction: column;
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

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Router>
      <GlobalStyle />
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ margin: "0 10px", textDecoration: "none", color: "#fff" }}>Todo List</Link>
        <Link to="/time-weather" style={{ margin: "0 10px", textDecoration: "none", color: "#fff" }}>현재 시각 & 운세</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TodoTemplate todos={todos} setTodos={setTodos} />} />
        <Route path="/time-weather" element={<TimeWeatherPage />} />
      </Routes>
    </Router>
  );
}

export default App;
