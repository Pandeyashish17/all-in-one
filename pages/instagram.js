import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Instagram = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [search, setSearch] = useState("");
  const [userBio, setUserBio] = useState(null);
  const getInfo = (user) => {
    if (user == "") return null;

    const header = {
      "X-RapidAPI-Key": "93aeb735c5msh7297516bc31c8fbp15accfjsn3206375c77c5",
      "X-RapidAPI-Host": "instagram130.p.rapidapi.com",
    };
    const options = {
      method: "GET",
      url: "https://instagram130.p.rapidapi.com/account-feed",
      params: { username: user },
      headers: header,
    };

    axios
      .request(options)
      .then(function (response) {
        setUserInfo(
          response.data.map((item) => {
            return {
              image: item.node.display_url,
              likedBy: item.node.edge_liked_by,
              comment: item.node.edge_media_to_comment,
            };
          })
        );
      })
      .catch(function (error) {
        console.error(error);
      });

    const options1 = {
      method: "GET",
      url: "https://instagram130.p.rapidapi.com/account-info",
      params: { username: user },
      headers: header,
    };

    axios
      .request(options1)
      .then(function (response) {
        console.log(response.data);
        setUserBio({
          fullName: response.data.full_name,
          bio: response.data.biography,
          follwedBy: response.data.edge_followed_by,
          follows: response.data.edge_follow,
          externalUrl: response.data?.external_url,
          image: response.data.profile_pic_url,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getInfo("instagram");
  }, []);

  return (
    <>
      <nav className=" px-4 py-2 ">
        <div className="flex flex-wrap items-center justify-between md:justify-around">
          {/* <!-- logo --> */}
          <img
            className="h-10"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/150px-Instagram_logo.svg.png"
            alt="instagram"
          />

          {/* <!-- search--> */}
          <div className="relative sm:m-10 ">
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
                  onClick={() => getInfo(search)}
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
          </div>
        </div>
      </nav>
      {userBio != null ? (
        <>
          <main className=" bg-opacity-25">
            <div className="lg:w-8/12 lg:mx-auto mb-8">
              <header className="flex flex-wrap items-center p-4 md:py-8">
                <div className="md:w-3/12 md:ml-16">
                  {/* <!-- profile image --> */}
                  <img
                    className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                     border-2 border-pink-600 p-1"
                    src={userBio.image}
                    alt="profile"
                  />
                </div>

                {/* <!-- profile meta --> */}
                <div className="w-8/12 md:w-7/12 ml-4">
                  <div className="md:flex md:flex-wrap md:items-center mb-4">
                    <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                      {userBio.fullName}
                    </h2>

                    {/* <!-- badge --> */}
                    <span
                      className="inline-block fas fa-certificate fa-lg text-blue-500 
                               relative mr-6 text-xl transform -translate-y-2"
                      aria-hidden="true"
                    ></span>

                    {/* <!-- follow button --> */}
                    <a
                      href="#"
                      className="bg-blue-500 px-2 py-1 
                        text-white font-semibold text-sm rounded block text-center 
                        sm:inline-block "
                    >
                      Follow
                    </a>
                  </div>

                  {/* <!-- post, following, followers list for medium screens --> */}
                  <ul className="hidden md:flex space-x-8 mb-4">
                    <li>
                      <span className="font-semibold">136</span>
                      posts
                    </li>

                    <li>
                      <span className="font-semibold">
                        {userBio.follwedBy.count}
                      </span>
                      followers
                    </li>
                    <li>
                      <span className="font-semibold">
                        {userBio.follows.count}
                      </span>
                      following
                    </li>
                  </ul>

                  {/* <!-- user meta form medium screens --> */}
                  <div className="hidden md:block">
                    <h1 className="font-semibold">{userBio.fullName}</h1>
                    <span>Travel, Nature and Music</span>
                    <p>Lorem ipsum dolor sit amet consectetur</p>
                  </div>
                </div>

                {/* <!-- user meta form small screens --> */}
                <div className="md:hidden text-sm my-2">
                  <h1 className="font-semibold">{userBio.fullName}</h1>
                  <span>Travel, Nature and Music</span>
                  <p>Lorem ipsum dolor sit amet consectetur</p>
                </div>
              </header>

              {/* <!-- posts --> */}
              <div className="px-px md:px-3">
                <div className="flex flex-wrap -mx-px md:-mx-3">
                  {userInfo != null ? (
                    <>
                      {userInfo.map((item, i) => {
                        return (
                          <div className="w-1/3 p-px md:px-3" key={i}>
                            <article className="post  text-white relative pb-full md:mb-6">
                              <img
                                className="w-full h-full absolute left-0 top-0 object-cover"
                                src={`${item.image}`}
                                alt="image"
                                crossorigin="anonymous"
                              />

                              <i className="fas fa-square absolute right-0 top-0 m-1"></i>

                              <div
                                className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                                left-0 top-0 hidden"
                              >
                                <div
                                  className="flex justify-center items-center 
                                    space-x-4 h-full"
                                >
                                  <span className="p-2">
                                    <i className="fas fa-heart"></i>
                                    {item.likedBy.count}
                                  </span>

                                  <span className="p-2">
                                    <i className="fas fa-comment"></i>
                                    {item.comment.count}
                                  </span>
                                </div>
                              </div>
                            </article>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <h1>error</h1>
                    </>
                  )}
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Instagram;
