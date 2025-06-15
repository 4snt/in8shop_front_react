import { getCurrentUser } from "@/actions/auth"; // ✅ Importa a função server-side corretamente
import Container from "@/components/Container";
import FormWrap from "@/components/FormWrap";
import LoginForm from "@/components/Forms/LoginForm";

interface LoginPageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function LoginPage({}: LoginPageProps) {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <FormWrap>
        <LoginForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
}
