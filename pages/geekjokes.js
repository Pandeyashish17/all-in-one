import axios from "axios";
import React, { useState } from "react";

const Index = () => {
  const [data, setData] = useState(
    "Mac users swear by their Mac and PC users swear at their PC."
  );
  const getJokes = () => {
    axios
      .get("https://geek-jokes.sameerkumar.website/api?format=json")
      .then((response) => {
        setData(response.data.joke);
      });
  };
  return (
    <div className="h-screen grid place-content-center px-3">
      <p className="mb-5">{data}</p>
      <button className="btn" onClick={() => getJokes()}>
        GetanotherJoke
      </button>
    </div>
  );
};

export default Index;
