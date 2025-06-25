import AppNavbar from "components/AppNavbar";
import QuestionCard from "./QuestionCard";

import useSWR from "swr";
import { useSearchParams } from "next/navigation";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function Questoes() {
  const searchParams = useSearchParams();

  const buildApiUrl = () => {
    const queryString = searchParams.toString();
    return `/api/questoes${queryString ? `?${queryString}` : ""}`;
  };

  const apiUrl = buildApiUrl();
  const { isLoading, data } = useSWR(apiUrl, fetchAPI);

  let questionsFound = null;

  if (!isLoading && data) {
    questionsFound = data;
  }

  return (
    <>
      <div className="bg-neutral-200 min-h-screen">
        <AppNavbar />
        <div className="max-w-screen-xl mx-auto">
          {isLoading ? (
            <div className="flex flex-row h-screen items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#922020] animate-bounce"></div>
              <div className="w-3 h-3 rounded-full bg-[#922020] animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-3 h-3 rounded-full bg-[#922020] animate-bounce [animation-delay:-.5s]"></div>
            </div>
          ) : (
            <div className="lg:py-5">
              {questionsFound.map((question) => (
                <div key={question._id} className="my-6 lg:my-10 mx-5">
                  <QuestionCard question={question} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Questoes;
