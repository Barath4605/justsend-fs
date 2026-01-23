import React, { useEffect, useState } from 'react';
import Navbar from "../components/homepage-components/Navbar.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import QuickLink from "../components/QuickLink.jsx";
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import "../styles/texteditor.scss"
import toast from "react-hot-toast";
import { Bookmark, Copy, CopyCheckIcon, Loader2 } from "lucide-react"
import BookmarkTitleModal from "../components/bookmarks-components/BookmarkTitleModal.jsx";


const DisplayText = () => {
    const { state } = useLocation()
    const { code } = useParams()
    const nav = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copy, setCopy] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [bookmarkModal, setBookmarkModal] = useState(false);


    useEffect(() => {
        if(!copy) return;

        const timer = setTimeout(() => {
            setCopy(false);
        },4000)
        return () => clearTimeout(timer);
    }, [copy]);

    useEffect(() => {
        const raw = localStorage.getItem("justsend_bookmark");
        const saved = raw ? JSON.parse(raw) : [];
        setBookmark(saved.some(b => b.code === code));
    }, [code]);


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

    // ================ LOADING SCRN ===================

    if (loading) {
        return (
            <main className="flex bg-linear-to-br from-black via-zinc-900 to-zinc-700
                                min-h-screen items-center justify-center gap-3
                                text-2xl font-family-[Montserrat] text-gray-600 tracking-widest">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2">
                        <h1>Loading</h1>
                        <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                    <h2 className="tracking-normal text-sm">this might take upto a minute or two...</h2>
                </div>
                <div>  </div>
            </main>
        );
    }

    if (!data) {
        return null;
    }

    // ====================== BOOKMARK ======================


    const handleBookmark = (title) => {
        const raw = localStorage.getItem("justsend_bookmark");
        const list = raw ? JSON.parse(raw) : [];

        if (list.some(b => b.code === code)) {
            toast.error("Already bookmarked!");
            return;
        }

        list.push({
            code,
            title,
            savedAt: Date.now(),
        });

        localStorage.setItem("justsend_bookmark", JSON.stringify(list));

        setBookmark(true);
        setBookmarkModal(false);
        toast.success("Saved to bookmarks!");
    };



    return (
        <main className="bg-linear-to-br from-black via-zinc-900 to-zinc-700
                            min-h-screen flex flex-col">
            <Navbar />

            {bookmarkModal && (
                <BookmarkTitleModal onClose={() => setBookmarkModal(false)}
                                    onSave={handleBookmark}/>
            )}

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
                        <button
                            onClick={async () => {
                                if (copy) return
                                setCopy(true)
                                await navigator.clipboard.writeText(editor.getText())
                                toast.success("Text Data Copied!")
                            }}
                            className={`
                                flex items-center text-sm p-1 m-1 rounded-sm
                                transition-all duration-300 ease-out cursor-pointer
                                ${copy ? "text-white scale-105" : "text-white/70"}
                             `}
                        >
                            {copy ? (
                                <>
                                    <CopyCheckIcon size={27} className="p-1" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy size={27} className="p-1" />
                                    Copy
                                </>
                            )}
                        </button>


                        <div className="w-px h-6 bg-gray-200/20"></div>

                        <button disabled={bookmark} onClick={() => setBookmarkModal(true)}
                                className="flex cursor-pointer items-center text-sm text-white/70 p-1 m-1 hover:backdrop-blur-2xl rounded-sm disabled:cursor-not-allowed disabled:opacity-45">
                            <Bookmark size="23" className={`stroke-white stroke-[0.8px] ${bookmark ? "fill-white" : "fill-transparent"} cursor-pointer`}/> {bookmark ? "Bookmarked!" : "Bookmark"}
                        </button>
                    </div>

                    <EditorContent editor={editor} className="tiptap" />
                </div>
            </section>
        </main>
    );
};

export default DisplayText;