import React from 'react';
import OTPInput from "react-otp-input";
import Buttons from "../homepage-components/Buttons.jsx";
import QuickLink from "../QuickLink.jsx";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const EnterCode = ({onClickFunc}) => {
    const [otp, setOtp] = React.useState("");
    const nav = useNavigate();

    const handleInvalidCode = () => {
        return otp.length === 6;
    }

    async function handleReceive() {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/${otp}`);

            if(!handleInvalidCode()) {
                toast.error("Invalid code length!");
                return;
            }

            if(!res.ok) {
                if(res.status === 404) {
                    toast.error("No such Code Exists!");
                    return;
                }
                if(res.status === 410) {
                    toast.error("Code Expired!");
                    return;
                }

                throw new Error("Something went wrong");
            } else {
                if(res.status === 200) {
                    toast.success("Code Successful!");
                }
            }

            const data = await res.json();
            setTimeout(() => {
                if (data.type === "TEXT") {
                    nav(`/${otp}`, { state: data });
                } else if (data.type === "IMAGE") {
                    nav(`/i/${otp}`, { state: data });
                }
            })

        } catch (err) {
            toast.error("Server Not Reachable!");
        }
    }

  return (
      <section className="flex flex-1 flex-col text-white font-[Mulish] w-[80%] lg:w-[60%] m-auto justify-center">
          <div className="ml-3">
              <QuickLink toLink="HOME" onClickFunc={onClickFunc} />
          </div>
          <h1 className="text-4xl lg:m-2 ml-2 lg:text-6xl font-bold lg:w-1/2">Enter the Receiver Code</h1>

          <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              shouldAutoFocus
              renderInput={(props) => (
                  <input
                      {...props}
                      style={{
                          width: "2.6rem",
                          height: "2.6rem",
                          fontSize: "1.5rem",
                          marginLeft: "0.5rem",
                          marginTop: "0.5rem",
                      }}
                      className="
                        text-center text-white
                        bg-zinc-800/70
                        border-zinc-600
                        rounded-lg

                        outline-none
                        focus:outline-none
                        focus:ring-0

                        transition-transform
                        duration-150
                        focus:scale-110
                        focus:border-white
                      "
                  />
              )}
          />

          <div className="m-2 my-4">
              <Buttons ButtonType="Validate Code" onClickFunc={() => handleReceive()} />
          </div>

      </section>
  );
};

export default EnterCode;
