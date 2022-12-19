import { predictStar } from "utils/UniverseModel";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MarkerOverlay from "../CircleOverlay/MarkerOverlay/MarkerOverlay";

const SelectedMarker = () => {
    const selectedMarker = useSelector((state) => state.markers.selectedMarker);
    const [place, setPlace] = useState(null);

    useEffect(() => {
        setPlace(null);
        if (selectedMarker) {
            if (selectedMarker.placeId > -1) {
                const token = localStorage.getItem("token");
                if (!token) return;

                const queryPlace = async () => {
                    const response = await fetch("http://localhost:5001/places/query", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: token,
                        },
                        body: JSON.stringify({ placeIdList: [selectedMarker.placeId] }),
                    });
                    const data = await response.json();
                    if (data.isFound) {
                        let placeInfo = data.placeInfoList[0];

                        placeInfo.placeStar = await predictStar(placeInfo.placeTokens);

                        const place = {
                            placeId: placeInfo.placeId,
                            position: {
                                lat: placeInfo.placeY,
                                lng: placeInfo.placeX,
                            },
                            placeName: placeInfo.placeName,
                            placeAddress: placeInfo.placeAddress,
                            placeReviews: placeInfo.placeReviews,
                            placeKeyword: placeInfo.placeKeyword,
                            placeHashtags: placeInfo.placeHashtags,
                            placeHashtagCounts: placeInfo.placeHashtagCounts,
                            placeStar: placeInfo.placeStar,
                            placeLank: -1,
                            center: {
                                lat: placeInfo.placeY,
                                lng: placeInfo.placeX,
                            },
                        };
                        setPlace(place);
                    }
                };
                queryPlace();
            }
        }
    }, [selectedMarker]);

    return <>{place ? <MarkerOverlay id="marker-selected" place={place} selected></MarkerOverlay> : null}</>;
};

export default SelectedMarker;
