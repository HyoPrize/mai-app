import { React, useState, useRef, Fragment } from "react";
import styled from "styled-components";
import { Map, Polyline, Circle, CustomOverlayMap } from "react-kakao-maps-sdk";

import CircleOverlay from "components/Control/CircleOverlay/CircleOverlay";
import { useDispatch, useSelector } from "react-redux";
import { setCircleMode } from "redux/actions/CircleModeAction";
import { addCircle } from "redux/actions/CircleAction";
import SelectedMarker from "components/Control/SelectedMarker/SelectedMarker";

const MapDiv = styled("div")`
    position: relative;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
`;

const { kakao } = window;

function MapCanvas(props) {
    const [drawingCircleData, setDrawingCircleData] = useState();
    const drawingLineRef = useRef();
    //const [circles, setCircles] = useState([]);
    const [mousePosition, setMousePosition] = useState({
        lat: 0,
        lng: 0,
    });
    const [isRangeError, setIsRangeError] = useState(false);

    const dispatch = useDispatch();
    const isCircleMode = useSelector((state) => state.circleMode.isCircleMode);
    const circles = useSelector((state) => state.circles.circles);
    const map = useSelector((state) => state.map);

    const handleClick = (_map, mouseEvent) => {
        if (isCircleMode) {
            if (!props.isDrawing) {
                setDrawingCircleData({
                    center: {
                        lat: mouseEvent.latLng.getLat(),
                        lng: mouseEvent.latLng.getLng(),
                    },
                    radius: 0,
                });
                props.setIsDrawing(true);
            }
        }
    };

    const handleMouseMove = (_map, mouseEvent) => {
        if (isCircleMode) {
            setMousePosition({
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
            });
            if (props.isDrawing) {
                const drawingLine = drawingLineRef.current;
                setDrawingCircleData((prev) => ({
                    ...prev,
                    radius: drawingLine.getLength(),
                }));

                setIsRangeError(
                    Math.floor(drawingLine.getLength()) > 5000 || Math.floor(drawingLine.getLength()) < 100
                );
            }
        }
    };

    const handleRightClick = (_map, _mouseEvent) => {
        if (isCircleMode) {
            if (props.isDrawing) {
                if (!isRangeError) {
                    props.setIsDrawing(false);
                    dispatch(addCircle({ ...drawingCircleData, mousePosition }));
                    dispatch(setCircleMode(false));
                }
            }
        }
    };

    return (
        <MapDiv>
            <Map
                id={"map"}
                // center={{ lat: 37.33, lng: 126.72 }}
                center={map.center}
                isPanto={map.isPanto}
                style={{ width: "100%", height: "100%" }}
                level={7}
                onClick={handleClick}
                onRightClick={handleRightClick}
                onMouseMove={handleMouseMove}
                disableDoubleClickZoom={true}
                zoomable={map.isZoomable}
            >
                {props.isDrawing && (
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
                                {isRangeError ? (
                                    <div style={{ color: "red" }}>100m ~ 5000m 내로 설정해주세요.</div>
                                ) : null}
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
                                lat={circle.center.lat}
                                lon={circle.center.lng}
                                circle={circle}
                            />
                        </CustomOverlayMap>
                    </Fragment>
                ))}
                <SelectedMarker />
            </Map>
        </MapDiv>
    );
}

export default MapCanvas;
