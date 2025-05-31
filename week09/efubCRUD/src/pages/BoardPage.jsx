import BoardList from "../components/BoardList";

export default function BoardPage({ member, onSelectBoard }) {
  return (
    <div>
      <BoardList member={member} onSelectBoard={onSelectBoard} />
    </div>
  );
}