import React from 'react';
import { Navigation, Bookmark} from "lucide-react"

const Navbar = () => {
  return (
    <header className="lg:p-5 p-2 flex items-center justify-between">
        <div className="items-center text-2xl justify-between">
            <div className="text-center text-white items-center flex font-[Montserrat] font-semibold cursor-pointer">
                <Navigation size={18} className="stroke-transparent fill-orange-400" />
                <h1 className="bg-linear-to-r from-zinc-200/60 via-zinc-300 to-zinc-400/80 bg-clip-text text-transparent">JUSTSEND</h1>
            </div>
        </div>

        <div className="p-1">
            <Bookmark size={23} className="stroke-white stroke-[0.8px] hover:fill-white cursor-pointer " />
        </div>
    </header>
  );
};

export default Navbar;
