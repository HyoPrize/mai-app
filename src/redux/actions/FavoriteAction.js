export const INIT_FAVORITES = "INIT_FAVORITE";
export const SET_FAVORITES = "SET_FAVORITES";

export const initFavorite = () => {
    return {
        type: INIT_FAVORITES,
    };
};

export const setFavorites = (favorites) => {
    return {
        type: SET_FAVORITES,
        payload: favorites,
    };
};
