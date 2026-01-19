import React, { useEffect, useState } from 'react';
import Navbar from "../components/homepage-components/Navbar.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import QuickLink from "../components/QuickLink.jsx";
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import "../styles/texteditor.scss"
import toast from "react-hot-toast";
import {BookCopy, Bookmark, ClipboardCopy, Copy, CopyCheckIcon, CopyPlus, TextCursor} from "lucide-react"


const DisplayText = () => {
    const { state } = useLocation()
    const { code } = useParams()
    const nav = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchDataFromCode() {
            if (code && !state) {
                setLoading(true);
                try {
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/${code}`);

                    if (!res.ok) {
                        if (res.status === 404) {
                            toast.error("No such Code Exists!");
                            nav("/");
                            return;
                        }
                        if (res.status === 410) {
                            toast.error("Code Expired!");
                            nav("/");
                            return;
                        }
                        throw new Error("Something went wrong");
                    }

                    const fetchedData = await res.json();
                    setData(fetchedData);
                    toast.success("Data loaded successfully!");
                } catch (err) {
                    toast.error("Server Not Reachable!");
                    nav("/");
                } finally {
                    setLoading(false);
                }
            } else if (state) {
                setData(state);
            }
        }

        fetchDataFromCode();
    }, [code, state, nav]);

    const editor = useEditor({
        extensions: [StarterKit],
        content: data?.text || '',
        editable: false,
    }, [data])

    if (loading) {
        return (
            <main className="bg-linear-to-br from-black via-zinc-900 to-zinc-700
                                min-h-screen flex flex-col items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </main>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <main className="bg-linear-to-br from-black via-zinc-900 to-zinc-700
                            min-h-screen flex flex-col">
            <Navbar />

            <section className="w-[90%] lg:w-[70%] min-h-150 m-auto text-white">
                <div className="flex">
                    <QuickLink toLink="HOME" onClickFunc={() => nav("/")} />
                </div>
                <div>
                    <h1 className="text-4xl my-2 lg:text-6xl font-bold lg:w-1/2">Text Data</h1>
                </div>

                <div className="tiptap-wrapper relative my-5 mb-10">
                    <div className="flex flex-row-reverse items-center backdrop-contrast-105 backdrop-blur-lg
                                    rounded-lg m-3 lg:mt-3 lg:mx-4 z-10 sticky top-4  w-fit">
                        <button onClick={
                            async () => {
                                await navigator.clipboard.writeText(editor.getText());
                                toast.success("Text Data Copied!");
                            }
                        } className="flex items-center cursor-pointer text-sm text-white/70 p-1 m-1 hover:backdrop-blur-2xl rounded-sm">
                            <CopyCheckIcon  size="27" className="p-1" />
                            Copy
                        </button>

                        <div className="w-px h-6 bg-gray-200/20"></div>

                        <button disabled  onClick={() => toast.success("Saved to your Bookmarks!")}
                                 className="flex cursor-pointer items-center text-sm text-white/70 p-1 m-1 hover:backdrop-blur-2xl rounded-sm disabled:cursor-not-allowed disabled:opacity-45">
                            <Bookmark size="27" className="p-1"
                            /> Bookmark
                        </button>
                    </div>

                    <EditorContent editor={editor} className="tiptap" />
                </div>
            </section>
        </main>
    );
};

export default DisplayText;