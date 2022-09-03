import { combineReducers } from "redux";

import addMenuLevelReducer from "./reducers/menuLevelReducer";

const rootReducer = combineReducers({
    menuLevel: addMenuLevelReducer,
});

export default rootReducer;
