import SignupForm from "../components/SignupForm";
// 필요하다면 LoginForm도 추가

export default function AuthPage({ onAuth }) {
  return (
    <div>
      <SignupForm onSignUp={onAuth} />
      {/* <LoginForm onLogin={onAuth} /> */}
    </div>
  );
}