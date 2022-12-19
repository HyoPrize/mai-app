import { combineReducers } from "redux";

import addMapReducer from "./reducers/MapReducer";
import addMenuLevelReducer from "./reducers/MenuLevelReducer";
import addMenuSelectReducer from "./reducers/MenuSelectReducer";
import addMenuSearchTextReducer from "./reducers/MenuSearchTextReducer";
import addUserToggleReducer from "./reducers/UserToggleReducer";
import addUserPageStateReducer from "./reducers/UserPageStateReducer";
import addUserReducer from "./reducers/UserReducer";
import addFavoriteReducer from "./reducers/FavoriteReducer";
import addHistoryReducer from "./reducers/HistoryReducer";
import addShareReducer from "./reducers/ShareReducer";
import addCircleModeReducer from "./reducers/CircleModeReducer";
import addCircleReducer from "./reducers/CircleReducer";
import addMarkerReducer from "./reducers/MarkerReducer";
import addColorReducer from "./reducers/ColorReducer";
import addImageSrcReducer from "./reducers/ImageSrcReducer";

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
    share: addShareReducer,
    circleMode: addCircleModeReducer,
    circles: addCircleReducer,
    markers: addMarkerReducer,
    color: addColorReducer,
    imageSrc: addImageSrcReducer,
});

export default rootReducer;
