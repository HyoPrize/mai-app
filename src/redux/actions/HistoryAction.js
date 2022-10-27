export const INIT_HISTORY = "INIT_HISTORY";
export const SET_HISTORIES = "SET_HISTORIES";
export const ADD_HISTORY = "ADD_HISTORY";
export const DELETE_HISTORY = "DELETE_HISTORY";

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

export const addHistory = (history) => {
    return {
        type: ADD_HISTORY,
        payload: history,
    };
};

export const deleteHistory = (historyNo) => {
    return {
        type: DELETE_HISTORY,
        payload: historyNo,
    };
};
