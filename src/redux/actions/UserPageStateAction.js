export const SET_USERPAGE = "SET_USERPAGE";
export const CANCEL_USERPAGE = "CANCEL_USERPAGE";

export const setUserPage = (state) => {
    return {
        type: SET_USERPAGE,
        payload: state,
    };
};

export const cancelUserPage = () => {
    return {
        type: CANCEL_USERPAGE,
    };
};
