import React, {use} from "react";
import toast from "react-hot-toast";
import { ImagePlus, X, Loader2 } from "lucide-react";
import Navbar from "../homepage-components/Navbar.jsx";
import GeneratedCode from "../sendertext-components/GeneratedCode.jsx";
import {useNavigate} from "react-router-dom";
import QuickLink from "../QuickLink.jsx";

const MAX_SIZE = 5 * 1024 * 1024;

const ImageUpload = () => {
    const [file, setFile] = React.useState(null);
    const [preview, setPreview] = React.useState(null);
    const [dragging, setDragging] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState(null);

    const nav = useNavigate();

    function validateFile(selected) {
        if (!selected.type.startsWith("image/")) {
            toast.error("Only image files allowed");
            return false;
        }

        if (selected.size > MAX_SIZE) {
            toast.error("Max file size is 5MB");
            return false;
        }

        return true;
    }

    function handleFile(selected) {
        if (!selected) return;
        if (!validateFile(selected)) return;

        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    }

    function handleInput(e) {
        handleFile(e.target.files[0]);
    }

    function handleDrop(e) {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files[0]);
    }

    function removeImage() {
        setFile(null);
        setPreview(null);
    }

    async function uploadImage() {
        if (!file) return;

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/i`,
                {
                    method: "POST",
                    body: formData
                }
            );

            if (!res.ok) {
                throw new Error("Upload failed");
            }

            const data = await res.json();
            setResult(data);
            toast.success("Image uploaded successfully");

        } catch (err) {
            toast.error("Upload failed");
        } finally {
            setLoading(false);
        }
    }

    if (result) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center min-h-[90vh] w-full">
                    <GeneratedCode
                        code={result.code}
                        expiryAt={new Date(result.expiryAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                    />
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="w-[90%] lg:w-[60%] m-auto mt-10 text-white">

                <div className="flex mb-3">
                    <QuickLink toLink="HOME" onClickFunc={() => nav("/")}></QuickLink>
                    <QuickLink toLink="OPTION" onClickFunc={() => nav("/option")}></QuickLink>
                </div>

                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className={`
                        relative flex flex-col items-center justify-center
                        border-2 border-dashed rounded-2xl
                        p-14 text-center cursor-pointer
                        transition-all duration-300
                        bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900
                        ${dragging ? "border-white scale-[1.02]" : "border-zinc-600/40"}
                    `}
                >
                    <ImagePlus size={48} className="text-white/60 mb-4" />

                    <p className="text-white/70 text-sm tracking-wide">
                        Drag & Drop Image
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                        or click to upload (max 5MB)
                    </p>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleInput}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>

                {preview && (
                    <div className="mt-8 relative group">
                        <img
                            src={preview}
                            alt="preview"
                            className="rounded-xl w-full max-h-100 object-contain bg-black/40"
                        />

                        <button
                            onClick={removeImage}
                            className="
                                absolute top-3 right-3
                                bg-black/70 backdrop-blur-md
                                p-2 rounded-full
                                text-white/70 hover:text-red-500
                                transition
                            "
                        >
                            <X size={18} />
                        </button>

                        <div className="my-3 text-sm text-white/50 font-mono">
                            {file.name} • {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                    </div>
                )}

                {file && (
                    <button
                        onClick={uploadImage}
                        disabled={loading}
                        className="
                                    w-fit px-5 py-1 tracking-[1.2px]
                                    backdrop-blur-2xl
                                    bg-linear-to-tl from-zinc-600/60 via-zinc-500/60 to-zinc-400/60
                                    hover:border-white hover:shadow-lg hover:shadow-zinc-800/30 my-2 mb-3
                                    rounded-md cursor-pointer transition-all duration-400 ease-in-out
                                  "

                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 size={16} className="animate-spin" />
                                Uploading...
                            </span>
                        ) : (
                            "Upload"
                        )}
                    </button>
                )}
            </div>
        </>
    );
};

export default ImageUpload;
