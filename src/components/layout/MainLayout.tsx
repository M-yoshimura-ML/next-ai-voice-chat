"use client";

import React, { useContext} from "react";
import Link from "next/link";
import { MenuContext } from "@/context/MenuContext";
import MainHeader from "./MainHeader";

import { AiOutlineHome } from "react-icons/ai";
import { GrProjects, GrLogin } from "react-icons/gr";
import { FaAngleRight, FaCheck, FaCheckDouble } from "react-icons/fa";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { SiSinglestore } from "react-icons/si"; 
import { MdOutlineRecordVoiceOver } from "react-icons/md";
import { RiVoiceAiLine } from "react-icons/ri";


const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const { isMenuOpen, toggleMenu } = useContext(MenuContext);
    return (
        <div className="min-h-screen bg-gray-100 w-full">
            <MainHeader />
            <div className="relative flex-1">
                {isMenuOpen && (
                    <aside className="fixed top-16 left-0 z-50 bg-white w-60 h-full shadow-lg p-4 rounded-r-lg transition duration-300 ease-in-out">
                        <ul>
                            <li className="flex justify-start items-center p-2 hover:bg-blue-200 rounded-lg transition duration-200 ease-in-out">
                                <AiOutlineHome className="mr-2" />
                                <Link href="/">Home</Link>
                            </li>
                            <li className="flex justify-start items-center p-2 hover:bg-blue-200 rounded-lg transition duration-200 ease-in-out">
                                <GrLogin className="mr-2" />
                                <Link href="/login">Login</Link>
                            </li>
                            <li className="flex justify-start items-center p-2 hover:bg-blue-200 rounded-lg transition duration-200 ease-in-out">
                                <RiVoiceAiLine className="mr-2" />
                                <Link href="/chat">Realtime Speak</Link>
                            </li>
                            <li className="flex justify-start items-center p-2 hover:bg-blue-200 rounded-lg transition duration-200 ease-in-out">
                                <MdOutlineRecordVoiceOver className="mr-2" />
                                <Link href="/chat2">Voice Chat</Link>
                            </li>
                            <li className="flex justify-start items-center p-2 hover:bg-blue-200 rounded-lg transition duration-200 ease-in-out">
                                <GrProjects className="mr-2" />
                                <h3 className="flex-1">Projects</h3>
                                <FaAngleRight className="ml-auto" />
                            </li>
                            <li className="flex flex-col justify-start items-start p-2 hover:bg-blue-200 rounded-xl transition duration-200 ease-in-out">
                                <div className="w-full flex flex-row justify-start items-center">
                                    <FaCheck className="mr-2" />
                                    <h3 className="flex-1">Singular</h3>
                                    <FaAngleRight className="ml-auto" />
                                </div>
                                <ul className="ml-4 mt-4">
                                    <li className="flex justify-center items-center gap-3">
                                        <SiSinglestore className="ml-8" />
                                        <Link href="/singular/selectbox">Select Box</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="flex justify-start items-center p-2 hover:bg-blue-200 rounded-lg transition duration-200 ease-in-out">
                                <IoIosHelpCircleOutline className="mr-2" />
                                <Link href="/help" className="">Help</Link>
                            </li>
                        </ul>
                    </aside>
                )}

                <main className="relative z-10">{children}</main>
            </div>
            
            <footer className="bg-gray-800 text-white p-4 text-center">
                © 2025 AI Voice Chat. All rights reserved.
            </footer>
        </div>
    );
}

export default MainLayout;
