import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/homepage-components/Navbar.jsx";
import QuickLink from "../components/QuickLink.jsx";

const DisplayImage = () => {
    const { code } = useParams();
    const nav = useNavigate();

    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchImage() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/image/${code}`
                );

                if (!res.ok) {
                    if (res.status === 404) {
                        toast.error("Image not found");
                        nav("/");
                        return;
                    }
                    if (res.status === 410) {
                        toast.error("Image expired");
                        nav("/");
                        return;
                    }
                    throw new Error();
                }

                const json = await res.json();
                setData(json);
            } catch {
                toast.error("Server unreachable");
                nav("/");
            } finally {
                setLoading(false);
            }
        }

        fetchImage();
    }, [code, nav]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                Loading...
            </div>
        );
    }

    if (!data) return null;

    return (
        <>
            <Navbar />
            <div className="w-[90%] lg:w-[70%] min-h-150 m-auto flex flex-col text-white">
                <div className="flex">
                    <QuickLink toLink="HOME" onClickFunc={() => nav("/")} />
                </div>
                <div>
                    <h1 className="text-4xl my-2 lg:text-6xl font-bold lg:w-1/2">Image Data</h1>
                </div>
                <img
                    src={data.fileUrl}
                    alt="uploaded"
                    className="max-w-full max-h-[80vh] m-auto lg:p-5 items-center shadow-lg"
                />

                <h1 className="m-auto pb-5"> Expires on :

                     {new Date(data.expiryAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                </h1>
            </div>
        </>
    );
};

export default DisplayImage;
