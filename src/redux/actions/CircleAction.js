export const ADD_CIRCLE = "ADD_CIRCLE";
export const DELETE_CIRCLE = "DELETE_CIRCLE";
export const INIT_CIRCLE = "INIT_CIRCLE";

export const addCircle = (circle) => {
    return {
        type: ADD_CIRCLE,
        payload: circle,
    };
};

export const deleteCircle = (circle) => {
    return {
        type: DELETE_CIRCLE,
        payload: circle,
    };
};

export const initCircle = () => {
    return {
        type: INIT_CIRCLE,
    };
};
