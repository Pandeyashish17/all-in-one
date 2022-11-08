import axios from "axios";
import React, { useState } from "react";

const Index = () => {
  const [details, setDetails] = useState(null);
  const [yourName, setYourName] = useState(null);
  const [yourCrushName, setYourCrushName] = useState(null);
  const getPercentage = (fname, sname) => {
    if (!fname || !sname) return null;
    const options = {
      method: "GET",
      url: "https://love-calculator.p.rapidapi.com/getPercentage",
      params: { sname: sname, fname: fname },
      headers: {
        "X-RapidAPI-Key": "72d6a402e6msh667395835d65e75p19fbbbjsn605752e190f4",
        "X-RapidAPI-Host": "love-calculator.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setDetails(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div className="h-[90vh] flex  items-center flex-col gap-3">
      <input
        type="text"
        placeholder="Your Name"
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => setYourName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Your Crush Name"
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => setYourCrushName(e.target.value)}
        required
      />
      <button
        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
        onClick={() => getPercentage(yourName, yourCrushName)}
      >
        find percentage
      </button>
      {details && (
        <div className="stats bg-primary text-primary-content">
          <div className="stat">
            <div className="stat-title">Your Name</div>
            <div className="stat-value capitalize">{details.fname}</div>
            <div className="stat-actions">
              <p className="btn ">{details.percentage}%</p>
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">your crush name</div>
            <div className="stat-value capitalize">{details.sname}</div>
            <div className="stat-actions">
              <p className="btn ">{details.result}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
