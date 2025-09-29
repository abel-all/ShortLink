'use client'

import { createContext, useContext, useReducer } from "react";
import userReducer, { initialState, initialStateType } from "./userReducer";


interface UserContextType {
    firstName: string;
    lastName: string;
    email: string;
    addUserInfo: (userinfo: initialStateType) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const addUserInfo = (userinfo: initialStateType) => {

        dispatch({
            type: "UPDATE_USER_INFO",
            payload: userinfo
        });

    }

    const value: UserContextType = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        addUserInfo,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const useUser = () => {

    const context = useContext(UserContext);

    if (context === undefined) throw new Error("useUser must be used within UserContext");

    return context;
}

export default useUser;