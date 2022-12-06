export const INIT_SHARES = "INIT_SHARES";
export const SET_SHARES = "SET_SHARES";

export const initShares = () => {
    return {
        type: INIT_SHARES,
    };
};

export const setShares = (shares) => {
    return {
        type: SET_SHARES,
        payload: shares,
    };
};
