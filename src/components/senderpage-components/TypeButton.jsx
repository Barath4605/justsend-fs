import React from 'react';
import { Notebook, ImagePlus } from "lucide-react";
import {useNavigate} from "react-router-dom";

const TypeButton = () => {

    const nav = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center w-full h-160 lg:space-x-6 lg:space-y-0 space-y-6">
        <button onClick={() => nav("/send")} className="backdrop-blur-2xl  lg:w-100 w-80 lg:h-40 h-40 bg-linear-to-bl
                            from-zinc-600/60 to-zinc-800/60
                            border border-gray-800 rounded-xl
                            shadow-lg cursor-pointer
                            group
                        ">
            <div className="flex items-start justify-center space-x-3 text-white/80 lg:text-lg font-semibold tracking-widest">
                <h1 className="group-hover:mb-2 transition-all duration-200 ease-in-out">
                    Send Text
                </h1>
                <Notebook size={24} strokeWidth={2} />
            </div>
        </button>
        <button onClick={() => nav("/image")} className="backdrop-blur-2xl  lg:w-100 w-80 lg:h-40 h-40 bg-linear-to-bl
                            from-zinc-600/60 to-zinc-800/60
                            border border-gray-800 rounded-xl
                            shadow-lg cursor-pointer
                            group
                        ">

            <div className="flex items-start justify-center space-x-3 text-white/80 lg:text-lg font-semibold tracking-widest">
                <h1 className="group-hover:mb-2 transition-all duration-200 ease-in-out">
                    Send Images
                </h1>
                <ImagePlus size={24} strokeWidth={2} />
            </div>
        </button>
    </div>
  );
};

export default TypeButton;
