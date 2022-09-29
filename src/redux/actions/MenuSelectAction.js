export const SELECT = "SELECT";
export const CANCEL = "CANCEL";

export const select = (menuName) => {
    return {
        type: SELECT,
        payload: menuName,
    };
};

export const cancel = () => {
    return {
        type: CANCEL,
    };
};
