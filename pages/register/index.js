import CredentialsForm from "components/CredentialsForm";

function Register() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-neutral-300">
        <CredentialsForm
          title="Criar uma conta"
          inputs={[
            {
              label: "Nome",
              id: "name",
              type: "text",
              placeholder: "Fulano de Tal",
              required: true,
              autoFocus: true,
            },
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
            {
              label: "Confirmar senha",
              id: "confirmPassword",
              type: "password",
              placeholder: "••••••••",
              required: true,
            },
          ]}
          buttonText="Registrar"
          redirectText={{
            label: "Já tem uma conta?",
            linkText: "Entre aqui!",
            href: "/login",
          }}
        />
      </div>
    </>
  );
}

export default Register;
