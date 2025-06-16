import { getCurrentUser } from "@/app/actions/auth";
import Container from "@/components/Container";
import FormWrap from "@/components/FormWrap";
import RegisterForm from "@/components/Forms/RegisterForm";

export default async function RegisterPage() {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <FormWrap>
        <RegisterForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
}
