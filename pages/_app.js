import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";
import { auth } from "../config/Firebase";
import { StateContext } from "../context/StateContext";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { useState } from "react";
import Login from "../components/Login";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  let themes = [
    "light",
    "dark",
    "synthwave",
    "cyberpunk",
    "halloween",
    "aqua",
    "fantasy",
    "dracula",
    "night",
    "coffee",
    "winter",
  ];
  const [theme, setTheme] = useState(
    themes[Math.floor(Math.random() * themes.length)]
  );
  if (loading) return <Loading theme={theme} />;
  if (!user) return <Login />;
  return (
    <StateContext>
      <div data-theme={theme}>
        {user && <Navbar theme={theme} setTheme={setTheme} themes={themes} />}
        <Component {...pageProps} />
      </div>
    </StateContext>
  );
}

export default MyApp;
