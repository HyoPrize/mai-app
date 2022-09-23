import { React, useState, useRef, Fragment } from "react";
import styled from "styled-components";
import { Map, Polyline, Circle, CustomOverlayMap } from "react-kakao-maps-sdk";

import CircleOverlay from "components/Control/CircleOverlay";

const MapDiv = styled("div")`
    position: relative;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
`;

//const { kakao } = window;

function MapCanvas(props) {
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawingCircleData, setDrawingCircleData] = useState();
    const drawingLineRef = useRef();
    const [circles, setCircles] = useState([]);
    const [mousePosition, setMousePosition] = useState({
        lat: 0,
        lng: 0,
    });

    const [isRangeOver, setIsRangeOver] = useState(false);

    const handleClick = (_map, mouseEvent) => {
        if (props.isCircleMode) {
            if (!isDrawing) {
                setDrawingCircleData({
                    center: {
                        lat: mouseEvent.latLng.getLat(),
                        lng: mouseEvent.latLng.getLng(),
                    },
                    radius: 0,
                });
                setIsDrawing(true);
            }
        }
    };

    const handleMouseMove = (_map, mouseEvent) => {
        if (props.isCircleMode) {
            setMousePosition({
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
            });
            if (isDrawing) {
                const drawingLine = drawingLineRef.current;
                setDrawingCircleData((prev) => ({
                    ...prev,
                    radius: drawingLine.getLength(),
                }));

                setIsRangeOver(Math.floor(drawingLine.getLength()) > 100000);
            }
        }
    };

    const handleRightClick = (_map, _mouseEvent) => {
        if (props.isCircleMode) {
            if (isDrawing) {
                if (!isRangeOver) {
                    setIsDrawing(false);
                    setCircles((prev) => [...prev, { ...drawingCircleData, mousePosition }]);
                    props.setIsCircleMode(false);
                }
            }
        }
    };

    return (
        <MapDiv>
            <Map
                id={"map"}
                center={{ lat: 37.33, lng: 126.72 }}
                style={{ width: "100%", height: "100%" }}
                level={7}
                onClick={handleClick}
                onRightClick={handleRightClick}
                onMouseMove={handleMouseMove}
                disableDoubleClickZoom={true}
            >
                {isDrawing && (
                    <>
                        <Circle
                            center={drawingCircleData.center}
                            radius={drawingCircleData.radius}
                            strokeWeight={1} // 선의 두께입니다
                            strokeColor={"#FFB17A"} // 선의 색깔입니다
                            strokeOpacity={0.1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={"#FFB17A"} // 채우기 색깔입니다
                            fillOpacity={0.5} // 채우기 불투명도입니다
                        />
                        <Polyline
                            path={[drawingCircleData.center, mousePosition]}
                            ref={drawingLineRef}
                            strokeWeight={3} // 선의 두께 입니다
                            strokeColor={"#FFB17A"} // 선의 색깔입니다
                            strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                        />
                        <CustomOverlayMap position={mousePosition} xAnchor={0} yAnchor={0} zIndex={1}>
                            <div className="info">
                                반경 <span className="number">{Math.floor(drawingCircleData.radius)}</span> m
                                {isRangeOver ? <div style={{ color: "red" }}>범위가 너무 큽니다!</div> : null}
                            </div>
                        </CustomOverlayMap>
                    </>
                )}
                {circles.map((circle) => (
                    <Fragment key={`circles-${circle.center.lat},${circle.center.lng}`}>
                        <Circle
                            center={circle.center}
                            radius={circle.radius}
                            strokeWeight={1} // 선의 두께입니다
                            strokeColor={"#FFB17A"} // 선의 색깔입니다
                            strokeOpacity={0.1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            fillColor={"#FFB17A"} // 채우기 색깔입니다
                            fillOpacity={0.5} // 채우기 불투명도입니다
                        />
                        <Polyline
                            path={[circle.center, circle.mousePosition]}
                            strokeWeight={3} // 선의 두께 입니다
                            strokeColor={"#FFB17A"} // 선의 색깔입니다
                            strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                        />
                        <CustomOverlayMap position={circle.mousePosition} xAnchor={0} yAnchor={0} zIndex={1}>
                            <CircleOverlay
                                distance={Math.floor(circle.radius)}
                                circle={circle}
                                lat={circle.center.lat}
                                lon={circle.center.lng}
                                setCircles={setCircles}
                            />
                        </CustomOverlayMap>
                    </Fragment>
                ))}
            </Map>
        </MapDiv>
    );
}

export default MapCanvas;
