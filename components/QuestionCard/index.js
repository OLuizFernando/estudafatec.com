import Image from "next/image";

import { useState } from "react";

function QuestionCard(props) {
  const question = props.question;

  const [selectedAlternative, setSelectedAlternative] = useState(null);

  function handleAlternativeSelect(alternative) {
    if (!hasAnswered) {
      selectedAlternative === alternative
        ? setSelectedAlternative(null)
        : setSelectedAlternative(alternative);
    }
  }

  const [eliminatedAlternatives, setEliminatedAlternatives] = useState([]);

  function handleRightClick(event, alternative) {
    event.preventDefault();
    if (!hasAnswered) {
      setEliminatedAlternatives((prev) =>
        prev.includes(alternative.letra)
          ? prev.filter((letra) => letra !== alternative.letra)
          : [...prev, alternative.letra],
      );
    }
  }

  const [hasAnswered, setHasAnswered] = useState(false);

  function handleAnswer() {
    if (selectedAlternative !== null && !hasAnswered) {
      setHasAnswered(true);
    }
  }

  function getAlternativeStyle(alternative) {
    const isSelected = selectedAlternative?.letra === alternative.letra;
    const isEliminated = eliminatedAlternatives.includes(alternative.letra);
    const isCorrect = alternative.correta;

    const baseStyle =
      "flex border-1 border-neutral-300 py-3 px-4 mx-4 my-2 rounded-lg hover:cursor-pointer transition-all duration-200 ease-in-out ";

    if (!hasAnswered) {
      if (isSelected) {
        return baseStyle + "ring-4 ring-neutral-400 bg-neutral-200 shadow-lg";
      } else if (isEliminated) {
        return baseStyle + "line-through bg-neutral-200";
      } else {
        return baseStyle + "hover:bg-neutral-200";
      }
    }

    if (isSelected && isCorrect)
      return baseStyle + "ring-4 ring-green-800 bg-green-200";

    if (isSelected && !isCorrect)
      return baseStyle + "ring-4 ring-[#922020] bg-red-200";

    if (!isSelected && isCorrect) return baseStyle + "bg-green-200";

    return baseStyle + "bg-neutral-200";
  }

  return (
    <>
      <div className="bg-white border-1 border-neutral-300 text-lg lg:text-xl shadow-lg rounded-xl">
        <div className="border-b-1 border-neutral-300 px-5 py-4">
          <div className="flex mb-2">
            <Image
              src="/icons/prova.png"
              width="25"
              height="20"
              alt="Ícone Prova"
              className="me-1 opacity-75"
            />
            <span className="text-[#2e2e2e]/75">
              Questão {question.numero} - {question.ano}/{question.semestre}
            </span>
          </div>
          <div className="flex">
            <Image
              src="/icons/livro.png"
              width="25"
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
          {question.imagens
            ? question.imagens.map((imagem, index) => (
                <img
                  className="max-h-125 max-w-fit mb-5"
                  src={imagem}
                  key={index}
                />
              ))
            : ""}
        </div>
        <div className="mb-4">
          {question.alternativas.map((alternative, index) => (
            <div
              onClick={() => handleAlternativeSelect(alternative)}
              onContextMenu={(event) => handleRightClick(event, alternative)}
              className={getAlternativeStyle(alternative)}
              key={index}
            >
              <p className="flex items-center text-[#2e2e2e]">
                <span className="opacity-75 me-2">{alternative.letra})</span>
                {alternative.texto}
                {alternative.imagem ? (
                  <img className="max-h-50 max-w-50" src={alternative.imagem} />
                ) : (
                  ""
                )}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={handleAnswer}
          className={`
            text-[#2e2e2e] border-1 border-neutral-300 py-3 px-4 mx-4 my-4 w-fit rounded-lg hover:cursor-pointer transition-all duration-200 ease-in-out
            ${hasAnswered || !selectedAlternative ? "bg-neutral-200" : "hover:border-[#922020] hover:bg-[#922020] hover:text-white"}
          `}
        >
          Responder
        </button>
      </div>
    </>
  );
}

export default QuestionCard;
