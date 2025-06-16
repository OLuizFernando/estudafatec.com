import Image from "next/image";

function QuestionCard(props) {
  const question = props.question;

  return (
    <>
      <div className="bg-white border-1 border-neutral-300 text-lg lg:text-xl shadow-lg rounded-xl">
        <div className="border-b-1 border-neutral-300 px-5 py-4">
          <div className="flex mb-2">
            <Image
              src="/icons/prova.png"
              width="20"
              height="20"
              alt="Ícone livro"
              className="me-1 opacity-75"
            />
            <span className="text-[#2e2e2e]/75">
              Questão {question.numero} - {question.ano}/{question.semestre}
            </span>
          </div>
          <div className="flex">
            <Image
              src="/icons/livro.png"
              width="20"
              height="20"
              alt="Ícone livro"
              className="me-1 opacity-75"
            />
            <span className="text-[#2e2e2e]/75">{question.disciplina}</span>
          </div>
        </div>
        <div className="px-5 flex flex-col">
          {question.textos.map((texto, index) => (
            <p key={index} className="my-4 text-[#2e2e2e]">
              {texto}
            </p>
          ))}
          {!question.imagens
            ? ""
            : question.imagens.map((imagem, index) => (
                <img
                  className="max-h-125 max-w-fit mb-5"
                  src={imagem}
                  key={index}
                />
              ))}
        </div>
        <div className="mb-4">
          {question.alternativas.map((alternative, index) => (
            <div
              className="flex border-1 border-neutral-300 py-3 px-4 mx-4 my-2 rounded-lg hover:cursor-pointer hover:bg-neutral-200 transition-all duration-200 ease-in-out"
              key={index}
            >
              <p className="flex items-center text-[#2e2e2e]">
                <span className="opacity-75 me-2">{alternative.letra})</span>
                {alternative.texto}
                <img className="max-h-50 max-w-50" src={alternative.imagem} />
              </p>
            </div>
          ))}
        </div>
        <div className="text-[#2e2e2e] border-1 border-neutral-300 py-3 px-4 mx-4 my-4 w-fit rounded-lg hover:cursor-pointer hover:border-[#922020] hover:bg-[#922020] hover:text-white transition-all duration-200 ease-in-out">
          Responder
        </div>
      </div>
    </>
  );
}

export default QuestionCard;
