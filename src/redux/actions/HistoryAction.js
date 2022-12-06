export const INIT_HISTORY = "INIT_HISTORY";
export const SET_HISTORIES = "SET_HISTORIES";

export const initHistory = () => {
    return {
        type: INIT_HISTORY,
    };
};

export const setHistories = (histories) => {
    return {
        type: SET_HISTORIES,
        payload: histories,
    };
};
