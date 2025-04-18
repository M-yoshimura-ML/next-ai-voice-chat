"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

type User = {
    username: string;
};

type AuthContextType = {
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const login = async (username: string, password: string): Promise<boolean> => {
        // 🧪 dummy user（Fixed later to use API）
        const dummyUser = {
            username: "testuser",
            password: "password123",
        };

        if (username === dummyUser.username && password === dummyUser.password) {
            setUser({ username });
            router.push("/chat");
            return true;
        }

        return false;
    };

    const logout = () => {
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
