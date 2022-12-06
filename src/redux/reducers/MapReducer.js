const initialState = {
    center: { lat: 37.33, lng: 126.72 },
    isPanto: false,
    isZoomable: true,
};

export default function addMapReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_MAP_CENTER": {
            return {
                ...state,
                center: action.payload.position,
                isPanto: action.payload.isPanto,
            };
        }
        case "SET_ZOOMABLE": {
            return {
                ...state,
                isZoomable: action.payload,
            };
        }
        default:
            return state;
    }
}
