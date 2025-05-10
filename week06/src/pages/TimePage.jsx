import React from "react";

function TimePage() {
  const now = new Date().toLocaleTimeString();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>현재 시각</h1>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>{now}</p>
    </div>
  );
}

export default TimePage;