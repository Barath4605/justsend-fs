import React from 'react';
import { useNavigate } from "react-router-dom"

const Buttons = ({ButtonType,toLink}) => {
    const nav = useNavigate();
    return (
      <div className="text-white  ">
          <button type="submit" onClick={() => nav(toLink)} className="w-fit px-5 py-1 tracking-[1.2px]
                    backdrop-blur-2xl
                    bg-linear-to-tl from-zinc-600/60 via-zinc-500/60 to-zinc-400/60
                    hover:border-white hover:shadow-lg hover:shadow-zinc-500/30
                    rounded-md cursor-pointer transition-all duration-400 ease-in-out"
                    >
              {ButtonType}
          </button>
      </div>


  );
};

export default Buttons;
