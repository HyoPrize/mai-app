// marker : {id : string, placeId: number, isShow: boolean, isFixed: boolean}

const initialState = {
    markers: [],
};

export default function addMarkerReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_MARKER": {
            const markerInfo = action.payload;
            const marker = { id: markerInfo.markerId, placeId: markerInfo.placeId, isShow: false, isFixed: false };
            state.markers.push(marker);
            return { ...state };
        }
        case "DELETE_MARKER": {
            const id = action.payload;
            const updatedMarkers = state.markers.filter((marker) => marker.id !== id);
            return { ...state, markers: updatedMarkers };
        }
        case "SHOW_MARKER": {
            const id = action.payload;
            const updatedMarkers = state.markers.map((marker) =>
                marker.id === id ? { ...marker, isShow: true } : marker
            );
            return { ...state, markers: updatedMarkers };
        }
        case "CLOSE_MARKER": {
            const id = action.payload;
            const updatedMarkers = state.markers.map((marker) =>
                marker.id === id ? { ...marker, isShow: false, isFixed: false } : marker
            );
            return { ...state, markers: updatedMarkers };
        }
        case "FIX_MARKER": {
            const id = action.payload;
            const updatedMarkers = state.markers.map((marker) =>
                marker.id === id
                    ? { ...marker, isShow: true, isFixed: true }
                    : { ...marker, isShow: false, isFixed: false }
            );
            return { ...state, markers: updatedMarkers };
        }
        default:
            return state;
    }
}
