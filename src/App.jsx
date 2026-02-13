import './App.css'
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SendText from "./pages/SendText.jsx";
import {Toaster} from "react-hot-toast";
import DisplayText from "./pages/DisplayText.jsx";
import Bookmark from "./pages/Bookmark.jsx";
import SenderPage from "./pages/SenderPage.jsx";
import SendImg from "./components/senderpage-components/ImageUpload.jsx";

function App() {
    return (
        <>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 2000,
                    style: {
                        background:
                            "linear-gradient(to top left, rgba(82,82,82,.6), rgba(113,113,113,.6), rgba(161,161,161,.6))",
                        color: "#fff",
                        backdropFilter: "blur(12px)",
                    },
                }}
            />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/option" element={<SenderPage />} />
                <Route path="/send" element={<SendText />} />
                <Route path="/:code" element={<DisplayText />} />
                <Route path="/bookmarks" element={<Bookmark />} />
                <Route path="/image" element={<SendImg />} />
            </Routes>
        </>
    )
}

export default App