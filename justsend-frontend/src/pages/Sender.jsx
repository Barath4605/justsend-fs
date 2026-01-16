import React from 'react';
import Navbar from "../components/homepage-components/Navbar.jsx";
import Buttons from "../components/homepage-components/Buttons.jsx";
import TextEditor from "../components/senderpage-components/TextEditor.jsx";
import GeneratedCode from "../components/senderpage-components/GeneratedCode.jsx";



const Sender = () => {
    const [text, setText] = React.useState("");
    const[messageSent, setMessageSent] = React.useState(false);
    console.log(text);

    function checkValidMessage() {
        const plain = text.replace(/<[^>]*>/g, "").trim()
        console.log(plain);
        if(plain === "") {
             setMessageSent(false);
        } else {
            setMessageSent(true);
        }
    }

  return (
      <section className="bg-linear-to-br from-black via-zinc-900 to-zinc-700
                          min-h-screen flex flex-col">
          <Navbar />

          {!messageSent ? (
              <div className="text-white w-[80%] m-auto lg:w-[60%]">
                  <h1 className="text-4xl lg:my-2 lg:text-6xl font-semibold tracking-[3px] lg:w-[90%] font-[Montserrat]">Send Text</h1>
                  <TextEditor onChange={setText} />
                  <div className="my-2">
                      <Buttons onClickFunc={() => checkValidMessage()} ButtonType="Send Message" />
                  </div>
              </div>
          ) : <GeneratedCode />}
      </section>
  );
};

export default Sender;
