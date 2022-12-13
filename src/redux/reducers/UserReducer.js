/*
userInfo : {
    userId : string,
    email : string,
}
*/

const initialState = {
    isLogin: false,
    userInfo: null,
};

export default function addUserReducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN": {
            return {
                ...state,
                isLogin: true,
                userInfo: action.payload,
            };
        }
        case "LOGOUT": {
            return {
                ...state,
                isLogin: false,
                userInfo: null,
            };
        }
        default:
            return state;
    }
}
