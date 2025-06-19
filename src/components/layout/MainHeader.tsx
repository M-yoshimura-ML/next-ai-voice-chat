"use client";

import React from "react";
import { MenuContext } from "@/context/MenuContext";
import { FaBars} from "react-icons/fa"
import ThemeToggle from "./ThemeToggle";

const MainHeader: React.FC = () => {
    const { toggleMenu } = React.useContext(MenuContext);
    return (
        <header className="bg-white dark:bg-black flex justify-between items-center p-4 shadow-md">
            <nav className="hidden md:flex space-x-4" />
            <div className="flex items-center">
                <h1 className="text-black dark:text-white text-xl font-bold">AI Voice Chat</h1>
            </div>
            <ThemeToggle />
            <div onClick={toggleMenu}><FaBars/></div>
        </header>
    );
}


export default MainHeader;