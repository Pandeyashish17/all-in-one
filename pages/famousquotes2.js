import axios from "axios";
import React, { useEffect, useState } from "react";

const famousquotes2 = () => {
  const [quotes, setQuotes] = useState(null);
  const [rand, setRand] = useState(null);
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://quotes15.p.rapidapi.com/quotes/random/",
      headers: {
        "X-RapidAPI-Key": "93aeb735c5msh7297516bc31c8fbp15accfjsn3206375c77c5",
        "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setQuotes({
          content: response.data.content,
          url: response.data.url,
          originator: response.data.originator,
          tags: response.data.tags,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [rand]);

  return (
    <>
      <div className="w-screen h-screen  flex items-center justify-center px-5 py-5">
        <div
          className="w-full mx-auto rounded-lg  shadow-lg px-5 pt-5 pb-10 "
          style={{
            maxWidth: "500",
          }}
        >
          <div className="w-full mb-10">
            <div className="text-3xl text-indigo-500 text-left leading-tight h-3">
              “
            </div>
            <p className="text-sm  text-center px-5">{quotes?.content}</p>
            <div className="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3">
              ”
            </div>
          </div>
          <div className="w-full">
            <p className="text-md  font-bold text-center">
              {quotes?.originator.name}
            </p>
            <p className="text-xs  text-center">{quotes?.originator.url}</p>
            <p>
              {quotes?.tags.slice(0,3).map((tag) => (
                <span key={tag} className="m-2 p-1 text-white rounded-lg bg-blue-700">
                  #{tag}
                </span>
              ))}
            </p>{" "}
            <button className="btn mt-2" onClick={() => setRand(Math.random())}>
              Refresh
            </button>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default famousquotes2;
