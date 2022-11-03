import React, { useState } from "react";

const Index = () => {
  const [imageDetails, setImageDetails] = useState({
    name: "dog",
    width: "500",
    height: "500",
  });
  return (
    <>
      <div className="h-[300vh]">
        <div className=" flex justify-center">
          <div className="flex gap-2">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                value={imageDetails.name}
                placeholder="Type here"
                onChange={(e) => {
                  setImageDetails({ ...imageDetails, name: e.target.value });
                }}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">width</span>
              </label>
              <input
                type="number"
                value={imageDetails.width}
                placeholder="Type here"
                onChange={(e) => {
                  setImageDetails({ ...imageDetails, width: e.target.value });
                }}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">height</span>
              </label>
              <input
                type="number"
                value={imageDetails.height}
                placeholder="Type here"
                onChange={(e) => {
                  setImageDetails({ ...imageDetails, height: e.target.value });
                }}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
        </div>
        <div className=" w-screen flex justify-center items-center mt-10">
          <img
            src={`https://source.unsplash.com/random/${imageDetails.width}x${imageDetails.height}/?${imageDetails.name}`}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Index;
