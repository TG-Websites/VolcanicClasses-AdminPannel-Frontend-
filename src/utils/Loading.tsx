// components/Loader.tsx
import React from "react";

const Loading: React.FC = () => {
  return (
    <div
      className="
        font-mono font-bold text-2xl
        w-fit
        [clip-path:inset(0_3ch_0_0)]
        before:content-['Loading...']
        animate-[loadingSteps_1s_steps(4)_infinite]
      "
    ></div>
  );
};

export default Loading;
