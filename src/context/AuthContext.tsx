"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
};

type DecodedToken = {
    exp: number;
    iat: number;
    sub: string;
}

const isTokenValid = (token: string): boolean => {
    try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Math.floor(Date.now() / 1000); 
        return decodedToken.exp > currentTime;
    } catch (error) {
        console.error("Token validation error:", error);
        return false;
    }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token && isTokenValid(token)) {
            setIsAuthenticated(true);
        } else {
            logout()
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await loginUser({ email, password });
            if (response.status === 200 && response.data) {
                localStorage.setItem("access_token", response.data.access_token);
                localStorage.setItem("token_type", response.data.token_type);
                setIsAuthenticated(true);
                //router.push("/chat");
                return { success: true, message: "Login successful" };
            } else {
                return { success: false, message: response.message || "Login failed" };
            }
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: "An error occurred during login" };
        }

    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
