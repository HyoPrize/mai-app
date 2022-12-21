/*
history : {
    placeId: number,
    placeKeyword: number,
    placeName: string,
    placeHashtags: array<string>,
    placeString: string
}
*/

const initialState = {
    histories: [],
};

export default function addHistoryReducer(state = initialState, action) {
    switch (action.type) {
        case "INIT_HISTORY": {
            return {
                ...state,
                histories: [],
            };
        }
        case "SET_HISTORIES": {
            let histories = action.payload.histories;

            histories = histories
                .map((history) => {
                    return {
                        ...history,
                        placeString: history.placeName + history.placeHashtags.join(""),
                    };
                })
                .reverse();
            return {
                ...state,
                histories: histories,
            };
        }
        default:
            return state;
    }
}
