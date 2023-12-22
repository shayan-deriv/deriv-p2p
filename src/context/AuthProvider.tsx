import React from 'react';
import { PropsWithChildren, createContext, useContext, useEffect } from 'react';

type TUser = {
    id: number;
    name: string;
    email: string;
    password: string;
    is_user_verified: boolean;
    is_allowed_to_see_advert_detail: boolean;
    is_allowed_to_buy_or_sell_advert: boolean;
}

type AuthContextData = Required<Pick<TUser, 'is_user_verified' | 'is_allowed_to_see_advert_detail' | 'is_allowed_to_buy_or_sell_advert'>>;

export const AuthContext = createContext<AuthContextData>({
    is_user_verified: false,
    is_allowed_to_see_advert_detail: false,
    is_allowed_to_buy_or_sell_advert: false,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = React.useState<TUser | undefined>(undefined);
    const fetchCurrentUser = async () => {
        const response = await fetch(`http://localhost:3001/user`);
        const data = await response.json();
        setUser(data);
    }

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={
            {
                is_user_verified : user?.is_user_verified ?? false,
                is_allowed_to_see_advert_detail: user?.is_allowed_to_see_advert_detail ?? false,
                is_allowed_to_buy_or_sell_advert : user?.is_allowed_to_buy_or_sell_advert ?? false,
            }
        }>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(' must be used within AuthProvider');
    }
    return context;
};

export default AuthProvider;
