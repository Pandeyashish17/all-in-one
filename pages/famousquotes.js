import React, { useEffect, useState } from "react";
import axios from "axios";
const Index = () => {
  const [text, setText] = useState(null);
  const [rand, setRand] = useState(1);
  useEffect(() => {
    const options = {
      method: "POST",
      url: "https://motivational-quotes1.p.rapidapi.com/motivation",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "93aeb735c5msh7297516bc31c8fbp15accfjsn3206375c77c5",
        "X-RapidAPI-Host": "motivational-quotes1.p.rapidapi.com",
      },
      data: '{"key1":"value","key2":"value"}',
    };

    axios
      .request(options)
      .then(function (response) {
        setText(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [rand]);
  return (
    <>
      <div className="grid place-content-center px-6 h-screen">
        {text && (
          <>
            <p>{text}</p>
            <button
              className="btn w-36 mt-4"
              onClick={() => setRand(Math.random())}
            >
              Refresh
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Index;
