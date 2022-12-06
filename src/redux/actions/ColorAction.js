export const SET_MAIN_COLOR = "SET_MAIN_COLOR";
export const SET_SUB_COLOR = "SET_SUB_COLOR";

export const setMainColor = (color) => {
    return {
        type: SET_MAIN_COLOR,
        payload: color,
    };
};

export const setSubColor = (color) => {
    return {
        type: SET_SUB_COLOR,
        payload: color,
    };
};
