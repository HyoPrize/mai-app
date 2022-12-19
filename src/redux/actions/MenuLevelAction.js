export const UP_MENU_LEVEL = "UP_MENU_LEVEL";
export const DOWN_MENU_LEVEL = "DOWN_MENU_LEVEL";
export const RESET_MENU_LEVEL = "RESET_MENU_LEVEL";
export const SET_MENU_LEVEL = "SET_MENU_LEVEL";

export const upMenuLevel = () => {
    return {
        type: UP_MENU_LEVEL,
    };
};

export const downMenuLevel = () => {
    return {
        type: DOWN_MENU_LEVEL,
    };
};

export const resetMenuLevel = () => {
    return {
        type: RESET_MENU_LEVEL,
    };
};

export const setMenuLevel = (menuLevel) => {
    return {
        type: SET_MENU_LEVEL,
        payload: menuLevel,
    };
};
