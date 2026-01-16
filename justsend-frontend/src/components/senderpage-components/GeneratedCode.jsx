import React from 'react';

const GeneratedCode = () => {
  return (
    <section className="w-[90%] lg:w-[70%] m-auto h-[70%]">
        <h1 className="text-4xl lg:my-2 lg:text-6xl font-semibold tracking-[3px] lg:w-[90%] font-[Montserrat] text-white">Generated Code</h1>
        <div className="flex w-fit text-center my-5 p-1 items-center font-[IBM_Plex_Mono]">
            {
                ["A","1","B","2","C","3"].map((code, index) => (
                    <h1 className="lg:text-6xl text-3xl lg:px-5 lg:py-1 p-2 mx-2 rounded-lg bg-black/30 text-white backdrop-blur-2xl">{code}</h1>
                ))
            }
        </div>
        <h2 className="text-center text-white/70 my-5 text-start">Expires on : 1/20/2026</h2>

    </section>
  );
};

export default GeneratedCode;
