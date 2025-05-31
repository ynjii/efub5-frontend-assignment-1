import BoardList from "../components/BoardList";
import { Container } from "../styles/CommonStyled";

export default function BoardPage({ member, onSelectBoard }) {
  return (
    <Container>
      <BoardList member={member} onSelectBoard={onSelectBoard} />
    </Container>
  );
}