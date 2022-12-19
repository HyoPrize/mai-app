import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

const MarkerMorePage = () => {
    const userPageState = useSelector((state) => state.userPageState.userPageState);
    const fixedMarker = useSelector((state) => state.markers.markers.filter((marker) => marker.isFixed)[0]);
    let prevPlaceRef = useRef(null);
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (fixedMarker && prevPlaceRef.current) {
            if (fixedMarker && prevPlaceRef.current.placeId !== fixedMarker.place.placeId) {
                setPlace(fixedMarker.place);
                prevPlaceRef.current = fixedMarker.place;
            }
        } else if (fixedMarker) {
            setPlace(fixedMarker.place);
            prevPlaceRef.current = fixedMarker.place;
        }
    }, [fixedMarker]);

    return (
        <>
            {place ? (
                <div hidden={userPageState !== "markerMore"}>
                    <img
                        style={{ padding: "10px", width: "100%", boxSizing: "border-box" }}
                        alt="tag cloud"
                        src={`http://localhost:5001/places/tag-cloud?placeId=${place.placeId}`}
                    ></img>
                    <div style={{ height: "300px", padding: "10px", boxSizing: "border-box" }}>
                        <Bar
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: "true",
                                        position: "top",
                                        labels: {
                                            color: "#000000",
                                            font: {
                                                family: "Roboto",
                                                weight: "bold",
                                            },
                                        },
                                    },
                                    title: {
                                        display: true,
                                        text: "타이틀",
                                        color: "#000000",
                                        font: {
                                            family: "Roboto",
                                            size: 16,
                                            weight: "bold",
                                        },
                                    },
                                },
                            }}
                            data={{
                                labels: [...new Set(place.placeHashtags.slice(1))],
                                datasets: [{ label: `개수`, data: place.placeHashtagCounts }],
                            }}
                        />
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default MarkerMorePage;
