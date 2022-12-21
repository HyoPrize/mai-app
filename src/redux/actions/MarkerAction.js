export const ADD_MARKER = "ADD_MARKER";
export const DELETE_MARKER = "DELETE_MARKER";
export const SHOW_MARKER = "SHOW_MARKER";
export const CLOSE_MARKER = "CLOSE_MARKER";
export const FIX_MARKER = "FIX_MARKER";
export const SELECT_MARKER = "SELECT_MARKER";

export const addMarker = (markerInfo) => {
    return {
        type: ADD_MARKER,
        payload: markerInfo,
    };
};

export const deleteMarker = (id) => {
    return {
        type: DELETE_MARKER,
        payload: id,
    };
};

export const showMarker = (id) => {
    return {
        type: SHOW_MARKER,
        payload: id,
    };
};

export const closeMarker = (id) => {
    return {
        type: CLOSE_MARKER,
        payload: id,
    };
};

export const fixMarker = (id) => {
    return {
        type: FIX_MARKER,
        payload: id,
    };
};

export const selectMarker = (placeId, placeKeyword) => {
    return {
        type: SELECT_MARKER,
        payload: { placeId: placeId, placeKeyword: placeKeyword },
    };
};
