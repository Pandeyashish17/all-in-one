import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/router";

const Dictionary = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("a");
  const [debouncedValue] = useDebounce(inputValue, 1500);
  const [returnedData, setReturnedData] = useState();
  const [error, setError] = useState("");
  console.log(returnedData);
  useEffect(() => {
    setError(false);
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${debouncedValue}`)
      .then((data) => setReturnedData(data.data))
      .catch((err) => setError(err));
  }, [debouncedValue]);
  return (
    <>
      <div className="p-5 h-[300vh]">
        <div className="flex justify-center ">
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered"
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          </div>
        </div>

        {error ? (
          <div className="h-screen mt-2">
            <div className="grid place-content-center">
              <h1 className="text-3xl">Error.. found</h1>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-8 overflow-x-auto">
              {returnedData?.map((list, i) => {
                const { word, phonetic, meanings, sourceUrls } = list;
                return (
                  <div key={i}>
                    <div className="w-full h-full">
                      <div>
                        <p className="text-3xl"> Word: {word}</p> {`    `}
                        <p className="text-2xl"> Phonetic: {phonetic}</p>
                        <div>
                          {meanings?.map((item, i) => {
                            const {
                              partOfSpeech,
                              definitions,
                              synonyms,
                              antonyms,
                            } = item;
                            return (
                              <>
                                <div className="px-5 mt-4" key={i}>
                                  <span className="text-2xl mb-1">
                                    part of Speech: {partOfSpeech}
                                  </span>
                                  <ul class="space-y-1 list-disc list-inside  ">
                                    {definitions.map((item, i) => {
                                      return <li key={i}>{item.definition}</li>;
                                    })}
                                  </ul>
                                  {synonyms.length != 0 && (
                                    <p className="mt-3 text-xl">
                                      Synonyms:{" "}
                                      {synonyms.map((synonym, i) => {
                                        return (
                                          <span key={i} className="mx-1">
                                            {synonym}
                                          </span>
                                        );
                                      })}
                                    </p>
                                  )}
                                  {antonyms.length != 0 && (
                                    <p className="mt-3 text-xl">
                                      antonyms:{" "}
                                      {synonyms.map((antonym, i) => {
                                        return (
                                          <span key={i} className="mx-1">
                                            {antonym}
                                          </span>
                                        );
                                      })}
                                    </p>
                                  )}
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xl">
                      {sourceUrls.map((sourceUrl, i) => {
                        return (
                          <a
                            href={sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={i}
                            className="hover:text-blue-500 hover:scale-105 transition-all duration-300"
                          >
                            <span>{sourceUrl}</span>;
                          </a>
                        );
                      })}
                    </p>
                    <div className="relative flex py-5 items-center">
                      <div className="flex-grow border-t border-gray-400"></div>
                      <span className="flex-shrink mx-4 text-gray-400">
                        ......
                      </span>
                      <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dictionary;
