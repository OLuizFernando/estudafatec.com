import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const responseBody = await response.json();

    if (response.status === 201) {
      setMessage(
        "Registrado com sucesso! Você será avisado assim que a plataforma estiver no ar.",
      );
      setEmail("");
      setIsError(false);
    } else {
      setMessage(responseBody.message);
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-neutral-300 px-5">
      <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-2xl py-15 px-10 md:p-15 max-w-xl w-full">
        <h1 className="text-4xl font-bold mb-7 text-[#2e2e2e] text-center">
          Em Construção
        </h1>
        <Image
          src="/icons/cone.png"
          alt="Ícone cone"
          width={95}
          height={95}
          className="mb-7"
        />
        <p className="text-center text-xl text-neutral-600 mb-7">
          Nossa plataforma ainda está em desenvolvimento.
          <br />
          Deixe seu e-mail para ser avisado assim que estivermos prontos para
          recebê-lo!
        </p>

        {message && (
          <p
            className={`max-w-md w-full py-4 px-5 mb-5 rounded-xl text-xl text-center shadow-lg ${
              isError
                ? "bg-[#922020]/10 text-[#922020]"
                : "bg-green-500/10 text-green-800"
            }`}
          >
            {message}
          </p>
        )}

        {!isError && message ? null : (
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <label
              htmlFor="email"
              className="mb-1 text-lg font-medium text-[#2e2e2e]"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="exemplo@email.com"
              required
              autoFocus
              className="border border-gray-300 rounded-lg p-3 mb-5 text-[#2e2e2e] focus:ring-2 focus:ring-[#922020] focus:border-[#922020]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#922020] hover:bg-red-900 text-white rounded-lg p-3 text-xl shadow-2xl focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              Inscreva-se
            </button>
          </form>
        )}

        <Link href="/" className="text-[#2e2e2e] text-center mt-3">
          Caiu aqui de paraquedas?{" "}
          <span className="text-[#922020] hover:underline">
            Conheça a plataforma!
          </span>
        </Link>
      </div>
    </div>
  );
}
