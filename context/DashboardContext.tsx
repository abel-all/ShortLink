'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";


interface UserContextType {
    isExpanded: boolean;
    setIsExpanded: Dispatch<SetStateAction<boolean>>;
}

const DashboardContext = createContext<UserContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: {children: React.ReactNode}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(() =>
        typeof window !== "undefined" ? window.innerWidth > 768 : true
    );

    const value = {
        isExpanded,
        setIsExpanded,
    }

    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

const useDashboard = () => {

    const context = useContext(DashboardContext);

    if (context === undefined) throw new Error("useDashboard must be used within DashboardContext");

    return context;
}

export default useDashboard;