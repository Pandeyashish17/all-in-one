import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Index = () => {
  const router = useRouter();
  const { category } = router.query;
  const [data, setData] = useState();

  const [random, setRandom] = useState();
  useEffect(() => {
    axios
      .get(`https://excuser.herokuapp.com/v1/excuse/${category}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [random]);
  console.log(data);
  return (
    <div className="grid place-content-center h-screen">
      <p className="text-2xl mb-4">
        {data?.map((item,i) => {
          return <span key={i}>{item?.excuse}</span>;
        })}
      </p>
      <button className="btn" onClick={() => setRandom(Math.random())}>
        Refresh
      </button>
    </div>
  );
};

export default Index;
