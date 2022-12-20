/*
favorite : {
    placeId: number,
    placeName: string,
    placeAddress: string,
    placeHashtags: array<string>,
    placeString: string
}
*/

const initialState = {
    favorites: [],
};

const addFavoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INIT_FAVORITES": {
            return {
                ...state,
                favorites: [],
            };
        }
        case "SET_FAVORITES": {
            let favorites = action.payload.favorites;
            favorites = favorites
                .map((favorite) => {
                    return {
                        ...favorite,
                        placeString: favorite.placeName + favorite.placeHashtags.join("") + favorite.placeAddress,
                    };
                })
                .reverse();
            return {
                ...state,
                favorites: favorites,
            };
        }
        default:
            return state;
    }
};

export default addFavoriteReducer;
