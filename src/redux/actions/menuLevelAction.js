const UP = "UP";
const DOWN = "DOWN";
const RESET = "RESET";
const SETLEVEL = "SET_LEVEL";

export const up = () => {
    return {
        type: UP,
    };
};

export const down = () => {
    return {
        type: DOWN,
    };
};

export const reset = () => {
    return {
        type: RESET,
    };
};

export const setLevel = (menuLevel) => {
    return {
        type: SETLEVEL,
        payload: menuLevel,
    };
};
