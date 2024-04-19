import React, { createContext, } from 'react';
import { auth } from "./../firebaseConfig";
import { useAuthState } from 'react-firebase-hooks/auth'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user] = useAuthState(auth)

    return (
        <AuthContext.Provider value={{ user, auth }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };