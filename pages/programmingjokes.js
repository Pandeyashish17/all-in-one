import React, { useState } from "react";
import axios from "axios";
const Index = () => {
  const [getJoke, setGetJoke] = useState([]);
  const getRandomJoke = () => {
    const options = {
      method: "GET",
      url: "https://programmer-humor.p.rapidapi.com/api/9gag",
      params: { after: "5" },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_PROGRAMMINGJOKES,
        "X-RapidAPI-Host": "programmer-humor.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setGetJoke(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div className="h-full flex justify-center items-center flex-col gap-10  px-3">
      {getJoke.map((item, i) => {
        return (
          <div className="mt-50" key={i}>
            <p className="text-3xl mb-2">{item.title}</p>
            <img src={item.media} width={500} heigth={500} alt="" />
          </div>
        );
      })}

      {getJoke.length == 0 && (
        <div className="w-screen h-screen grid place-content-center px-2">
          <button className="btn mt-5" onClick={() => getRandomJoke()}>
            Get Joke
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;
