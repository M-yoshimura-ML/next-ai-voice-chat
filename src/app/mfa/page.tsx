"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; 

export default function MfaPage() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { mfa } = useAuth();

    const handleMfaSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const user_id = localStorage.getItem("user_id");
        if (!user_id) {
            setError("User ID not found.");
            return;
        }

        const result = await mfa(otp);
        if (result.success) {
            router.push("/chat2"); 
        } else {
            setError(result.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleMfaSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4">
                    Verify OTP
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
}
