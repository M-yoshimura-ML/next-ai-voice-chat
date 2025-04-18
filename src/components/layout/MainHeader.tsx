"use client";

import React from "react";
import { MenuContext } from "@/context/MenuContext";
import { FaBars} from "react-icons/fa"

const MainHeader: React.FC = () => {
    const { toggleMenu } = React.useContext(MenuContext);
    return (
        <header className="bg-white flex justify-between items-center p-4 shadow-md">
            <div onClick={toggleMenu}><FaBars/></div>
        </header>
    );
}


export default MainHeader;