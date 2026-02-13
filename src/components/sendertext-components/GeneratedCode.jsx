import React from 'react';
import { Copy } from "lucide-react"
import toast from 'react-hot-toast'
import {useNavigate} from "react-router-dom";
import QuickLink from "../QuickLink.jsx";

const GeneratedCode = ({customFunc, code, expiryAt}) => {

    const codeGenerated = {code};

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        toast.success("Code Copied!");
    };

    const nav = useNavigate();

  return (
    <section className="w-[90%] lg:w-[70%] m-auto h-[70%]">
        <div className="flex ml-5 flex-1 w-fit items-start justify-start">
            <QuickLink toLink="HOME" onClickFunc={() => nav("/")} />
            <QuickLink toLink="SEND TEXT" onClickFunc={customFunc} />
        </div>
        <h1 className="text-4xl mx-4 lg:my-2 lg:text-6xl font-semibold tracking-[3px] lg:w-[90%]
        font-[Montserrat] text-white">Generated Code</h1>
        <div className="flex w-fit text-center my-5 p-1 items-center font-[IBM_Plex_Mono]">
            <div className="flex">
                {
                    [...code].map((code, index) => (

                        <h1 className="lg:text-6xl text-3xl lg:px-5 lg:py-1 px-3 py-2 lg:mx-2 mx-1 rounded-lg bg-black/30 text-white backdrop-blur-2xl">{code}</h1>
                    ))
                }
            </div>
            <div>
                <Copy onClick={handleCopy} size={24} className="p-1 cursor-pointer text-white" />
            </div>
        </div>
        <h2 className="text-center mx-4 text-white/70 my-5 lg:text-start">Expires on : {expiryAt}</h2>

    </section>
  );
};

export default GeneratedCode;
