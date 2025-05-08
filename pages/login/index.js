import CredentialsForm from "components/CredentialsForm";

function Login() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-neutral-300">
        <CredentialsForm
          title="Entrar"
          inputs={[
            {
              label: "E-mail",
              id: "email",
              type: "email",
              placeholder: "exemplo@email.com",
              required: true,
            },
            {
              label: "Senha",
              id: "password",
              type: "password",
              placeholder: "••••••••",
              required: true,
            },
          ]}
          buttonText="Entrar na plataforma"
          redirectText={{
            label: "Não tem uma conta?",
            linkText: "Crie uma aqui!",
            href: "/register",
          }}
        />
      </div>
    </>
  );
}

export default Login;
