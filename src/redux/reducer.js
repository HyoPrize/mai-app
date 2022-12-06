import { combineReducers } from "redux";

import addMapReducer from "./reducers/MapReducer";
import addMenuLevelReducer from "./reducers/MenuLevelReducer";
import addMenuSelectReducer from "./reducers/MenuSelectReducer";
import addUserToggleReducer from "./reducers/UserToggleReducer";
import addMenuSearchTextReducer from "./reducers/MenuSearchTextReducer";
import addUserPageStateReducer from "./reducers/UserPageStateReducer";
import addUserReducer from "./reducers/UserReducer";
import addFavoriteReducer from "./reducers/FavoriteReducer";
import addHistoryReducer from "./reducers/HistoryReducer";
import addCircleModeReducer from "./reducers/CircleModeReducer";
import addCircleReducer from "./reducers/CircleReducer";
import addMarkerReducer from "./reducers/MarkerReducer";
import addColorReducer from "./reducers/ColorReducer";

const rootReducer = combineReducers({
    map: addMapReducer,
    menuLevel: addMenuLevelReducer,
    menuSelect: addMenuSelectReducer,
    searchText: addMenuSearchTextReducer,
    userToggle: addUserToggleReducer,
    userPageState: addUserPageStateReducer,
    user: addUserReducer,
    favorite: addFavoriteReducer,
    history: addHistoryReducer,
    circleMode: addCircleModeReducer,
    circles: addCircleReducer,
    markers: addMarkerReducer,
    color: addColorReducer,
});

export default rootReducer;
