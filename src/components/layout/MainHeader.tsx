"use client";

import React from "react";
import { MenuContext } from "@/context/MenuContext";
import { FaBars} from "react-icons/fa"

const MainHeader: React.FC = () => {
    const { toggleMenu } = React.useContext(MenuContext);
    return (
        <header className="bg-white flex justify-between items-center p-4 shadow-md">
            <nav className="hidden md:flex space-x-4" />
            <div className="flex items-center">
                <h1 className="text-xl font-bold">AI Voice Chat</h1>
            </div>
            <div onClick={toggleMenu}><FaBars/></div>
        </header>
    );
}


export default MainHeader;