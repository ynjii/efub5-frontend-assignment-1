import SignupForm from "../components/SignupForm";
import { Container } from "../styles/CommonStyled";

export default function AuthPage({ onAuth }) {
  return (
    <Container>
      <SignupForm onSignUp={onAuth} />
    </Container>
  );
}