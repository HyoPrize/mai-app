const initialState = {
    userImageSrc: "http://localhost:5001/users/image?userNo=-1",
};

const addImageSrcReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_IMAGESRC": {
            return {
                ...state,
                userImageSrc: action.payload,
            };
        }
        default:
            return state;
    }
};

export default addImageSrcReducer;
