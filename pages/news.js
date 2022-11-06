import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import countryList from "react-select-country-list";

const Index = () => {
  const options = useMemo(() => countryList().getData(), []);
  const [selected, setSelected] = useState();
  const [news, setNews] = useState({});
  const [search, setSearch] = useState("");
  let API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const getNews = (location) => {
    if (!location) return null;
    setNews();
    axios
      .get(
        ` https://newsapi.org/v2/top-headlines?country=${location}&language
=en&sortBy=popularity&apiKey=${API_KEY}
`
      )
      .then((res) => {
        let data = res.data;
        setNews({
          totalResults: data.totalResults,
          articles: data.articles.map((item) => {
            return {
              author: item.author,
              content: item.content,
              publishedAt: item.publishedAt,
              source: item.source,
              title: item.title,
              url: item.url,
              image: item.urlToImage,
            };
          }),
        });
      });
  };
  const getNewsBySearch = (searchTerm) => {
    if (!searchTerm) return null;
    setNews();
    axios
      .get(
        ` https://newsapi.org/v2/everything?q=${searchTerm}&language
=en&sortBy=popularity&apiKey=${API_KEY}
`
      )
      .then((res) => {
        let data = res.data;
        setNews({
          totalResults: data.totalResults,
          articles: data.articles.map((item) => {
            return {
              author: item.author,
              content: item.content,
              publishedAt: item.publishedAt,
              source: item.source,
              title: item.title,
              url: item.url,
              image: item.urlToImage,
            };
          }),
        });
      });
  };

  useEffect(() => {
    getNews("us");
  }, []);

  console.log(news);
  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="form-control">
          <div className="input-group">
            <select className="select select-bordered" onChange={handleChange}>
              <option disabled selected>
                Pick country or Search
              </option>
              {options.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <button className="btn" onClick={() => getNews(selected)}>
              Go
            </button>
          </div>
        </div>
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-square"
              onClick={() => getNewsBySearch(search)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        {news?.totalResults != 0 ? (
          <div class="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {news?.articles?.map((item, i) => (
              <div
                className="card w-96 bg-base-100 shadow-xl image-full"
                key={i}
              >
                <figure>
                  <img
                    src={item.image || "https://myshort.io/s/4Qvq1"}
                    alt="Shoes"
                    width={380}
                    height={216}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.source.name}</h2>
                  <p>{item.title}</p>
                  <div className="card-actions justify-end">
                    <a
                      href={item.url}
                      target="_blank"
                      className="btn btn-primary"
                      rel="noreferrer"
                    >
                      Read Now{" "}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-screen ">
            <h2 className="text-4xl">No Articles</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
