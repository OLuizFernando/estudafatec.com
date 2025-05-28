import CredentialsForm from "components/CredentialsForm";

function Waitlist() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-neutral-300">
        <CredentialsForm
          endpoint="/api/waitlist"
          title="Lista de Espera"
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
          ]}
          buttonText="Registrar"
          redirectText={{
            label: "Caiu aqui de paraquedas?",
            linkText: "Conheça a plataforma!",
            href: "/",
          }}
        />
      </div>
    </>
  );
}

export default Waitlist;
