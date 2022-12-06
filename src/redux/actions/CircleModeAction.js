export const TOGGLE_CIRCLE_MODE = "TOGGLE_CIRCLE_MODE";
export const SET_CIRCLE_MODE = "SET_CIRCLE_MODE";

export const toggleCircleMode = () => {
    return {
        type: TOGGLE_CIRCLE_MODE,
    };
};

export const setCircleMode = (isCircleMode) => {
    return {
        type: SET_CIRCLE_MODE,
        payload: isCircleMode,
    };
};
