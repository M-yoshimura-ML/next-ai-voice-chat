"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext"; 
import { useRouter } from "next/navigation";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const result = await login(email, password);
        if (result.success) {
            router.push("/chat"); 
        } else {
            setError(result.message || "Login failed. Please try again.");
        }

    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">email</label>
                <input 
                    type="text" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full" />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Login</button>
        </form>
        </div>
    );
}