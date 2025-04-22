"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { useRouter } from "next/navigation";
import { loginUser, refreshToken } from "@/lib/api";
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

const getTokenExpiration = (token: string): number | null => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp ? payload.exp * 1000 : null; // conver to ms
    } catch (e) {
      return null;
    }
};

const getUserId = (token: string): string | null => {
    try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        return decodedToken.sub || null;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const refreshTimeout = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        if (access_token && isTokenValid(access_token)) {
            setIsAuthenticated(true);
            setToken(access_token);
            scheduleTokenRefresh(access_token); // set the refresh time
        } else {
            logout()
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await loginUser({ email, password });
            if (response.status === 200 && response.data) {
                const { access_token, token_type } = response.data;
                localStorage.setItem("access_token", access_token);
                localStorage.setItem("token_type", token_type);
                const userId = getUserId(access_token);
                if (userId) {
                    localStorage.setItem("user_id", userId);
                } else {
                    console.error("User ID not found in token");
                }
                setIsAuthenticated(true);
                setToken(access_token);

                scheduleTokenRefresh(access_token); // set the refresh time

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
        localStorage.removeItem("user_id");
        setToken(null);
        if (refreshTimeout.current) {
            clearTimeout(refreshTimeout.current);
        }
        router.push("/login");

    };

    const scheduleTokenRefresh = (token: string) => {
        const exp = getTokenExpiration(token);
        if (!exp) return;
    
        const now = Date.now();
        const refreshTime = exp - now - 5 * 60 * 1000; // Refresh 5 minutes before expiration
    
        if (refreshTimeout.current) {
            clearTimeout(refreshTimeout.current);
        }
    
        if (refreshTime > 0) {
            refreshTimeout.current = setTimeout(() => {
                doRefreshToken();
            }, refreshTime);
        }
    };

    const doRefreshToken = async () => {
        try {
          const res = await refreshToken();
    
          if (res.status === 200 && res.data) {
            const { access_token, token_type } = res.data;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("token_type", token_type);
            setToken(access_token);
            setIsAuthenticated(true);
            scheduleTokenRefresh(access_token); // set the next refresh time
            console.log("Token refreshed successfully");
          } else {
            logout();
          }
        } catch (err) {
          console.error("Token refresh failed:", err);
          logout();
        }
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
