const initialState = {
    searchText: "",
};

export default function addMenuSearchTextReducer(state = initialState, action) {
    switch (action.type) {
        case "CAHNGE_SEARCH_TEXT": {
            return {
                ...state,
                searchText: action.payload,
            };
        }
        default:
            return state;
    }
}
