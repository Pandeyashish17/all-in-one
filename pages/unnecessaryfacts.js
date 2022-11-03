import axios from "axios";
import React, { useState } from "react";

const Index = () => {
  const [data, setData] = useState();
  const getUnnecessaryFacts = () => {
    axios
      .get("https://uselessfacts.jsph.pl/random.json")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  console.log(data);
  return (
    <div className="grid place-content-center h-screen px-4">
      <p className="text-2xl mb-4">{data?.text}</p>
      <button className="btn" onClick={() => getUnnecessaryFacts()}>
        get Unnesessary facts
      </button>
    </div>
  );
};

export default Index;
