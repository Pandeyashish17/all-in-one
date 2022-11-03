import axios from "axios";
import React, { useState } from "react";

const Index = () => {
  const [data, setData] = useState(null);
  const getMemes = () => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((res) => setData(res.data.data.memes))
      .catch((err) => console.log(err));
  };
  return (
    <div className="h-full flex justify-center items-center">
      {data == null && (
        <div className="h-screen">
          <button className="btn" onClick={() => getMemes()}>
            get memes
          </button>
        </div>
      )}
      {data != null && (
        <div className="container grid grid-cols-3 gap-2 mx-auto">
          {data.map((meme,i) => {
            return (
              <div className="flex items-center justify-center" key={i}>
                <div className="overflow-hidden  aspect-video  cursor-pointer rounded-xl relative group">
                  <div className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute  inset-x-0 -bottom-2 pt-30  flex items-end">
                    <div>
                      <div className="  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                        <div className="font-bold text-white">{meme.name}</div>
                      </div>
                    </div>
                  </div>
                  <img
                    alt=""
                    className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                    src={meme.url}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Index;
