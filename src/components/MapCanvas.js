/* global kakao */
import { useState, useEffect } from "react";
import styled from "styled-components";

const { kakao } = window;

const MapDiv = styled("div")`
    width: 100vw;
    height: 100vh;
`;

function MapCanvas() {
    const [map, setMap] = useState(null);
    useEffect(() => {
        let container = document.getElementById("map");

        let options = {
            center: new window.kakao.maps.LatLng(37.4, 126.8),
            level: 11,
        };

        setMap(new window.kakao.maps.Map(container, options));

        console.log("loading kakaomap");
    }, []);

    return <MapDiv id="map"></MapDiv>;
}

export default MapCanvas;