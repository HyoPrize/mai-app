/*
favorite : {
    favoriteNo: number,
    placeId: number,
    favoriteName: string,
    favoriteAddress: string,
    favoriteHashtags: array<string>,
    favoriteString: string
}
*/

const initialState = {
    favorites: [],
};

const addFavoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INIT_FAVORITE": {
            return {
                ...state,
                favorites: [],
            };
        }
        case "SET_FAVORITES": {
            let favorites = action.payload.favorites;
            favorites = favorites.map((favorite) => {
                return {
                    ...favorite,
                    favoriteString:
                        favorite.favoriteName + favorite.favoriteHashtags.join("") + favorite.favoriteAddress,
                };
            });
            return {
                ...state,
                favorites: favorites,
            };
        }
        case "ADD_FAVORITE": {
            let favorite = action.payload.favorite;

            favorite.favoriteString =
                favorite.favoriteName + favorite.favoriteHashtags.join("") + favorite.favoriteAddress;
            return [...state, favorite];
        }
        case "DELETE_FAVORITE":
            const updatedFavorites = state.favorites.filter((favorite) => favorite.favoriteNo !== action.payload);
            return { ...state, favorites: updatedFavorites };
        default:
            return state;
    }
};

export default addFavoriteReducer;
