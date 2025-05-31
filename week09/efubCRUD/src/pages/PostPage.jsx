import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

export default function PostPage({ member, board }) {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <h2>게시글</h2>
      {!board && <div style={{ color: "#888" }}>먼저 게시판을 조회/선택하세요.</div>}
      {board && (
        <>
          <PostForm member={member} board={board} />
          <PostList member={member} board={board} />
        </>
      )}
    </div>
  );
}