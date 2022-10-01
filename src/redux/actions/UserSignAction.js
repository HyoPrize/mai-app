export const SIGNIN = "SIGNIN";
export const SIGNUP = "SIGNUP";
export const CANCEL = "CANCEL";

export const signIn = () => {
    return {
        type: SIGNIN,
    };
};

export const signUp = () => {
    return {
        type: SIGNUP,
    };
};

export const cancel = () => {
    return {
        type: CANCEL,
    };
};
