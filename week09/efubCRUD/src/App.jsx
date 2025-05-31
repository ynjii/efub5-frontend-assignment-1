import React, { useState } from "react";
import NavTabs from "./components/NavTabs";
import AuthPage from "./pages/AuthPage";
import BoardPage from "./pages/BoardPage";
import PostPage from "./pages/PostPage";

export default function App() {
  const [member, setMember] = useState(null);
  const [tab, setTab] = useState("board");
  const [selectedBoard, setSelectedBoard] = useState(null);

  console.log("App member:", member);

  if (!member) return <AuthPage onAuth={setMember} />;

  return (
    <div>
      <NavTabs tab={tab} setTab={setTab} />
      {tab === "board" && (
        <BoardPage member={member} onSelectBoard={setSelectedBoard} />
      )}
      {tab === "post" && (
        <PostPage member={member} board={selectedBoard} />
      )}
    </div>
  );
}
