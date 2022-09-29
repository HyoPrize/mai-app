export const UP = "UP";
export const DOWN = "DOWN";
export const RESET = "RESET";
export const SETLEVEL = "SET_LEVEL";

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
