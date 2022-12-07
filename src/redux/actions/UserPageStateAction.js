export const SET_USERPAGE = "SET_USERPAGE";
export const CLOSE_USERPAGE = "CLOSE_USERPAGE";

export const setUserPage = (state) => {
    return {
        type: SET_USERPAGE,
        payload: state,
    };
};

export const closeUserPage = () => {
    return {
        type: CLOSE_USERPAGE,
    };
};
