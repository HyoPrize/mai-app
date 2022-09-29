export const CAHNGE_SEARCH_TEXT = "CAHNGE_SEARCH_TEXT";

export const changeSearchText = (searchText) => {
    return {
        type: CAHNGE_SEARCH_TEXT,
        payload: searchText,
    };
};
