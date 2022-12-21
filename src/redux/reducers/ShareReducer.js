/*
share : {
    placeId: number,
    placeKeyword: string,
    placeName: string,
    placeAddress: string,
    placeHashtags: array<string>,
    placefavoriteCount: number,
}
*/

const initialState = {
    shares: [],
};

const addShareReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INIT_SHARES": {
            return {
                ...state,
                favorites: [],
            };
        }
        case "SET_SHARES": {
            let shares = action.payload;
            return {
                ...state,
                shares: shares,
            };
        }
        default:
            return state;
    }
};

export default addShareReducer;
