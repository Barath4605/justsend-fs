import React from 'react';
import Navbar from "../components/homepage-components/Navbar.jsx";
import Buttons from "../components/homepage-components/Buttons.jsx";
import {useNavigate} from "react-router-dom";
import EnterCode from "../components/receiver-components/EnterCode.jsx";

const HomePage = () => {

    const nav = useNavigate();
    const [open, setOpen] = React.useState(false);

  return (
      <main className="bg-linear-to-br from-black via-zinc-900 to-zinc-700
                        min-h-screen flex flex-col">
          <Navbar />

          { !open ?
              <section className="flex flex-1 flex-col text-white font-[Mulish] w-[80%] lg:w-[60%] m-auto justify-center">
                  <h1 className="text-4xl lg:m-2 lg:text-6xl font-bold lg:w-1/2">Welcome to JUSTSEND</h1>
                  <p className="text-sm lg:text-md lg:m-2 text-gray-400 lg:w-1/3">
                      Share any form of text messages instantly with
                      NO Sign Up required!
                  </p>
                  <div className="flex space-x-4 mt-5">
                      <Buttons ButtonType="SEND" onClickFunc={() => nav("/option")}/>
                      <Buttons ButtonType="RECEIVE" onClickFunc={() => setOpen(true)} />
                  </div>
              </section>
                : <EnterCode onClickFunc={() => setOpen(false)} />
          }
      </main>

  );
};

export default HomePage;
