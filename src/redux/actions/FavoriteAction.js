export const INIT_FAVORITE = "INIT_FAVORITE";
export const SET_FAVORITES = "SET_FAVORITES";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const DELETE_FAVORITE = "DELETE_FAVORITE";

export const initFavorite = () => {
    return {
        type: INIT_FAVORITE,
    };
};

export const setFavorites = (favorites) => {
    return {
        type: SET_FAVORITES,
        payload: favorites,
    };
};

export const addFavorite = (favorite) => {
    return {
        type: ADD_FAVORITE,
        payload: favorite,
    };
};

export const deleteFavorite = (favoriteNo) => {
    return {
        type: DELETE_FAVORITE,
        payload: favoriteNo,
    };
};
