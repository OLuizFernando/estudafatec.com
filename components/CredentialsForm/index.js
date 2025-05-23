function CredentialsForm({ title, inputs, buttonText, redirectText }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-2xl py-15 px-10 md:p-15 m-5 max-w-md">
        <h1 className="text-4xl text-center font-bold mb-10">{title}</h1>
        <form className="flex flex-col">
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
    </>
  );
}

export default CredentialsForm;
