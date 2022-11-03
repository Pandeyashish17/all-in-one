import React, { useState } from "react";
import axios from "axios";
const Index = () => {
  const [getJoke, setGetJoke] = useState(
    "Chuck Norris can write multi-threaded applications with a single thread."
  );
  const getRandomJoke = () => {
    const options = {
      method: "GET",
      url: "https://geek-jokes.p.rapidapi.com/api",
      params: { format: "json" },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_GEEK_JOKES,
        "X-RapidAPI-Host": "geek-jokes.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setGetJoke(response.data.joke);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div className="h-screen grid place-content-center px-3">
      <p className="text-2xl mb-4">{getJoke}</p>
      <button className="btn" onClick={() => getRandomJoke()}>
        Get another Joke
      </button>
    </div>
  );
};

export default Index;
