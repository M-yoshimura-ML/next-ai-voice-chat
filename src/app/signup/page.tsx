"use client";

import React, { useState } from 'react';
import { signupUser } from '@/lib/api';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await signupUser({ name, email, password });
            setMessage(response.message);
            setIsSuccess(response.status === 200);
            if (response.status === 200) {
                setName("");
                setEmail("");
                setPassword("");
            }
        } catch (err) {
            console.error("Signup error:", err);
            setMessage("Server error. Please try again later.");
            setIsSuccess(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Signup</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">name</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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
                {message && (
                    <p className={`mt-4 text-sm ${isSuccess ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </p>
                )}
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Signup</button>
            </form>
        </div>
    )
}

export default Signup;