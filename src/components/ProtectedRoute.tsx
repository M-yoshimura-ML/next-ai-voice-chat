// components/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/UI/Spiner/SimpleSpiner";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated]);

    // if (!isAuthenticated) return null;
    if (isAuthenticated === null || isAuthenticated === false) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <Spinner />
          </div>
        );
      }

    return <>{children}</>;
};
