import React from 'react';
import Navbar from "../components/homepage-components/Navbar.jsx";
import Buttons from "../components/homepage-components/Buttons.jsx";
import TextEditor from "../components/sendertext-components/TextEditor.jsx";
import GeneratedCode from "../components/sendertext-components/GeneratedCode.jsx";
import toast from 'react-hot-toast'
import QuickLink from "../components/QuickLink.jsx";
import {useNavigate} from "react-router-dom";
import CustomExpiry from "../components/sendertext-components/CustomExpiry.jsx";


const SendText = () => {

    const [text, setText] = React.useState("");
    const [result, setResult] = React.useState(null);
    const [totalDays, setTotalDays] = React.useState(3);
    const[messageSent, setMessageSent] = React.useState(false);

    const nav = useNavigate();

    function checkValidMessage() {
        const plain = text.replace(/<[^>]*>/g, "").trim()
        if(plain === "") {
            setMessageSent(false);
            return false;
        } else {
            setMessageSent(true);
            return true;
        }
    }

    async function sendMessage() {

        const validMessage = checkValidMessage();
        if (!validMessage) {
            toast.error("Cannot send empty Message!");
            return;
        }
        toast.success("Message stored successfully!");

        const res = await fetch(`${import.meta.env.VITE_API_URL}/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({text,totalDays})
        });

        const data = await res.json()
        setResult(data);
        setMessageSent(true);
    }

  return (
      <section className="bg-linear-to-br from-black via-zinc-900 to-zinc-700
                          min-h-screen flex flex-col">
          <Navbar />

          {!messageSent ? (
              <div className="text-white w-[95%] m-auto lg:w-[60%]">
                  <div className="flex">
                      <QuickLink toLink="HOME" onClickFunc={() => nav("/")}/>
                      <QuickLink toLink="OPTION" onClickFunc={() => nav("/option")}/>
                  </div>
                  <h1 className="text-4xl lg:my-2 lg:text-6xl font-semibold tracking-[3px] lg:w-[90%] font-[Montserrat]">
                      Send Text
                  </h1>
                  <TextEditor onChange={setText}  />
                  <CustomExpiry setTotalDays={setTotalDays} totalDays={totalDays} />
                  <div className="my-5 mb-10">
                      <Buttons onClickFunc={sendMessage} ButtonType="Send Message" />
                  </div>
              </div>
          ) : (
              result && (
                  <GeneratedCode
                      code={result.code}
                      expiryAt={new Date(result.expiryAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                      })}
                  />

              )
          )}

      </section>
  );
};

export default SendText;
