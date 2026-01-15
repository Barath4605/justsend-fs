import React from 'react';
import Navbar from "../components/homepage-components/Navbar.jsx";
import Buttons from "../components/homepage-components/Buttons.jsx";

const Sender = () => {
  return (
      <section className="bg-linear-to-br from-black via-zinc-900 to-zinc-700
                          min-h-screen flex flex-col">
          <Navbar />

          <div className="text-white w-[80%] m-auto lg:w-[60%]">
              <h1 className="text-4xl lg:my-2 lg:text-6xl font-bold lg:w-[90%]">SEND TEXT</h1>
              <textarea name="text" rows="17" cols="40" placeholder="Enter your text here" className="bg-linear-to-tl from-gray-800 to-gray-900 my-5 w-full resize-none rounded-md
                        focus:outline-none focus:ring-0 focus:ring-offset-0 p-2
                        text-lg tracking-[1.3px] font-['IBM_Plex_Mono']"></textarea>
              <Buttons ButtonType="Send Message" />
          </div>

      </section>
  );
};

export default Sender;
