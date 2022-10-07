export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = async (userInfo) => {
    return {
        type: LOGIN,
        payload: userInfo,
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
    };
};
