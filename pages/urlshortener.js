import axios from "axios";
import React, { useState } from "react";

const Index = () => {
  const [search, setSearch] = useState(null);
  const [result, setResult] = useState(null);

  const shortUrl = (url) => {
    if (!url) return null;
    const options = {
      method: "POST",
      url: "https://url-shortener20.p.rapidapi.com/shorten",
      params: {
        url: url,
      },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "93aeb735c5msh7297516bc31c8fbp15accfjsn3206375c77c5",
        "X-RapidAPI-Host": "url-shortener20.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setResult(response.data.short_link);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <>
      <div className="h-screen flex justify-center mt-10">
        <div className="flex flex-col gap-10">
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-square"
                onClick={() => shortUrl(search)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            {result && (
              <div>
                <a href={result}>{result}</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
