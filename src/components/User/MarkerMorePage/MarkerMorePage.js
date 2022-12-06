import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const MarkerMorePage = () => {
    const userPageState = useSelector((state) => state.userPageState.userPageState);
    const selectedMarker = useSelector((state) => state.markers.markers.filter((marker) => marker.isFixed)[0]);
    let prevPlaceIdRef = useRef(-1);
    const [placeId, setPlaceId] = useState(-1);

    useEffect(() => {
        if (selectedMarker && prevPlaceIdRef.current !== selectedMarker.placeId) {
            setPlaceId(selectedMarker.placeId);

            prevPlaceIdRef.current = selectedMarker.placeId;
        }
    }, [selectedMarker]);

    return (
        <div hidden={userPageState !== "markerMore"}>
            <img
                style={{ padding: "10px", width: "100%", boxSizing: "border-box" }}
                alt="tag cloud"
                src={`http://localhost:5001/places/tag-cloud?placeId=${placeId}`}
            ></img>
        </div>
    );
};

export default MarkerMorePage;
