/*
history : {
    historyNo: number,
    historyName: string,
    historyHashtags: array<string>,
    historyString: string
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

            histories = histories.map((history) => {
                return {
                    ...history,
                    historyString: history.historyName + history.historyHashtags.join(""),
                };
            });
            return {
                ...state,
                histories: histories,
            };
        }
        case "ADD_HISTORY": {
            let history = action.payload.history;
            history.historyString = history.historyName + history.historyHashtags.join("");
            return [...state, history];
        }
        case "DELETE_HISTORY":
            const updatedHistorys = state.histories.filter((history) => history.historyNo !== action.payload);
            return { ...state, histories: updatedHistorys };
        default:
            return state;
    }
}
