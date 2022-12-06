export const SET_MAP_CENTER = "SET_MAP_CENTER";
export const SET_ZOOMABLE = "SET_ZOOMABLE";

// center: { lat: 33.452613, lng: 126.570888 }
export const setMapCenter = (position, isPanto) => {
    return {
        type: SET_MAP_CENTER,
        payload: { position: position, isPanto: isPanto },
    };
};

export const setMapZoomable = (isZoomable) => {
    return {
        type: SET_ZOOMABLE,
        payload: isZoomable,
    };
};
