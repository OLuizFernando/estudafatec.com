import { useState } from "react";

function CredentialsForm({
  title,
  inputs,
  buttonText,
  redirectText,
  endpoint,
}) {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (response.status === 201) {
      setMessage("Registrado com sucesso à nossa lista de espera!");
      setFormData({});
    } else {
      setMessage(`${responseBody.message} ${responseBody.action}`);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-2xl py-15 px-10 md:p-15 m-5 max-w-md">
        <h1 className="text-4xl text-center font-bold mb-10 text-[#2e2e2e]">
          {title}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {inputs.map((input) => (
            <div key={input.id} className="mb-5">
              <label
                htmlFor={input.id}
                className="block mb-1 ps-1 text-lg font-medium text-[#2e2e2e]"
              >
                {input.label}
              </label>
              <input
                type={input.type}
                id={input.id}
                placeholder={input.placeholder}
                required={input.required}
                autoFocus={input.autoFocus}
                className="border shadow-[inset_0_2px_5px_rgba(0,0,0,0.1)] border-gray-300 text-[#2e2e2e] rounded-lg focus:ring-2 focus:ring-[#922020] focus:border-[#922020] w-full p-3"
                value={formData[input.id] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
          <button
            type="submit"
            className="text-white shadow-2xl bg-[#922020] hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 text-xl rounded-lg p-3 text-center w-full mt-5"
          >
            {buttonText}
          </button>
        </form>
        {redirectText ? (
          <a
            href={redirectText.href}
            className="text-[#2e2e2e] text-center mt-3"
          >
            {redirectText.label}{" "}
            <span className="text-[#922020] hover:underline">
              {redirectText.linkText}
            </span>
          </a>
        ) : null}
      </div>

      {message ? (
        <p className="text-[#2e2e2e] text-xl text-center max-w-md w-full py-7 px-5 bg-white shadow-lg rounded-2xl">
          {message}
        </p>
      ) : null}
    </>
  );
}

export default CredentialsForm;
