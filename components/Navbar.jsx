import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/Firebase";

const Navbar = ({ themes, setTheme, theme }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/">
            <a className="btn btn-ghost normal-case text-xl">ashish</a>
          </Link>
          <button className="btn btn-sm " onClick={() => router.back()}>
            Go Back
          </button>
          <div className="dropdown dropdown-end">
            <button className="btn btn-sm ml-1 ">{theme}</button>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {themes.map((theme, i) => {
                return (
                  <li key={i} className="m-1">
                    <button
                      className="btn btn-outline btn-accent"
                      onClick={() => {
                        setTheme(theme);
                      }}
                    >
                      {theme}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <button onClick={() => auth.signOut()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
