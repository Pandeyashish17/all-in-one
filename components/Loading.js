import React from "react";
import { SpinnerDotted } from "spinners-react";

const Loading = ({theme}) => {
  return (
    <>
      <div className="h-screen grid place-content-center" data-theme={theme}>
        <SpinnerDotted size={50} thickness={100} speed={100} color="#36ad47" />
      </div>
    </>
  );
};

export default Loading;
