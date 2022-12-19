// marker : {id : string, place: {placeInfo}, isShow: boolean, isFixed: boolean}
// selectedMarker : { placeId: number }

const initialState = {
    markers: [],
    selectedMarker: null,
};

export default function addMarkerReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_MARKER": {
            const markerInfo = action.payload;
            const marker = { id: markerInfo.markerId, place: markerInfo.place, isShow: false, isFixed: false };
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
            return { ...state, markers: updatedMarkers, selectedMarker: null };
        }
        case "SELECT_MARKER": {
            const placeId = action.payload;
            const updatedMarkers = state.markers.map((marker) => ({ ...marker, isShow: false, isFixed: false }));
            return { ...state, markers: updatedMarkers, selectedMarker: placeId > -1 ? { placeId: placeId } : null };
        }
        default:
            return state;
    }
}
