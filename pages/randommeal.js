import axios from "axios";
import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";

const Index = () => {
  const [data, setData] = useState(null);
  const getRandomMeal = () => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => setData(res.data.meals))
      .catch((err) => console.log(err));
  };
  return (
    <div className="h-full">
      {data == null && (
        <div className="h-screen grid place-content-center">
          <button className="btn" onClick={() => getRandomMeal()}>
            Generate Random meal
          </button>
        </div>
      )}
      <div>
        {data?.map((item, i) => {
          const {
            strMeal,
            strCategory,
            strInstructions,
            strMealThumb,
            strYoutube,
          } = item;
          return (
            <div key={i}>
              <section className="py-10  lg:py-0">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                  <div className="grid items-stretch grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 xl:gap-x-24">
                    <div className="h-full pr-12 lg:order-2 lg:mb-40">
                      <div className="relative h-full lg:h-auto">
                        <div className="absolute w-full h-full -mb-12 overflow-hidden bg-gradient-to-r from-fuchsia-600 to-blue-600 top-12 left-12 xl:left-16 lg:top-0 lg:scale-y-105 lg:origin-top">
                          <img
                            className="object-cover object-right w-full h-full scale-150"
                            src="https://cdn.rareblocks.xyz/collection/celebration/images/content/2/lines.svg"
                            alt=""
                          />
                        </div>
                        <div className="relative lg:-top-12">
                          <img className="" src={strMealThumb} alt="" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-start py-10 lg:order-1 sm:py-16 lg:py-24 xl:py-48 overflow-x-scroll px-2 ">
                      <div>
                        <p className="text-sm font-semibold tracking-widest  uppercase">
                          {strCategory}
                        </p>
                        <h2 className="mt-8 text-3xl font-bold leading-tight  sm:text-4xl lg:text-5xl lg:leading-tight">
                          {strMeal}
                        </h2>
                        <p className="text-xl leading-relaxed  mt-9 break-keep mb-2">
                          {strInstructions}
                        </p>

                        <ReactPlayer url={strYoutube} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
