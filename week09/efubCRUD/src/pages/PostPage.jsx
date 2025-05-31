import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { Container } from "../styles/CommonStyled";

export default function PostPage({ member, board }) {
  console.log("PostPage member:", member);

  return (
    <Container>
      <h2>게시글</h2>
      {!board && <div style={{ color: "#888" }}>먼저 게시판을 조회/선택하세요.</div>}
      {board && (
        <>
          <PostForm member={member} board={board} />
          <PostList member={member} board={board} />
        </>
      )}
    </Container>
  );
}