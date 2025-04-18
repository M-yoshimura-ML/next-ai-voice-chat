"use client";
import React, { useState, useContext } from "react";
// import { MenuContext } from "@/context/MenuContext";

export const MenuContext = React.createContext<{
    isMenuOpen: boolean;
    toggleMenu: () => void;
}>({
    isMenuOpen: false,
    toggleMenu: () => {},
});

const MenuContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <MenuContext.Provider value={{ isMenuOpen, toggleMenu }}>
            {children}
        </MenuContext.Provider>
    );
}

export default MenuContextProvider;

