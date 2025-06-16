import { getCurrentUser } from "@/app/actions/auth";
import Container from "@/components/Container";
import FormWrap from "@/components/FormWrap";
import LoginForm from "@/components/Forms/LoginForm";

export default async function LoginPage() {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <FormWrap>
        <LoginForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
}
