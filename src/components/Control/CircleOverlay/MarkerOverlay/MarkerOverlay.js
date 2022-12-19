import { useEffect } from "react";
import styled from "styled-components";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import CloseButton from "../CloseButton";
import { useDispatch, useSelector } from "react-redux";
import { setMapCenter } from "redux/actions/MapAction";
import { addMarker, closeMarker, deleteMarker, fixMarker, selectMarker, showMarker } from "redux/actions/MarkerAction";
import MarkerScrollbars from "./MarkerScrollbars";
import MarkerMoreButton from "./MarkerMoreButton";
import MarkerFavoriteButton from "./MarkerFavoriteButton";
import { Box, List, ListItem, Tooltip } from "@mui/material";
import CircularProgressWithLabelAndTooltip from "components/Custom/CircularProgressWithLabelAndTooltip";
import { resetMenuLevel } from "redux/actions/MenuLevelAction";

const MarkerOverlayDiv = styled("div")`
    /* background-color: #fffded95; */
    border-radius: 15px;
    height: 300px;
    width: 300px;
    border: 1px solid grey;
`;

const MarkerNameDiv = styled("div")`
    position: absolute;
    top: 30px;
    left: 15px;
    font-size: 20px;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    :hover {
        overflow: visible;
    }
`;

const MarkerStarDiv = styled("div")`
    position: absolute;
    top: 12px;
    right: 15px;
    font-size: 20px;
`;

const MarkerAddressDiv = styled("div")`
    position: absolute;
    top: 60px;
    left: 15px;
    font-size: 15px;
    font-weight: 500;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    :hover {
        overflow: visible;
    }
`;

const MarkerLine = styled("hr")`
    position: absolute;
    left: 15px;
    width: 88%;
`;

const MarkerHashtag = styled("div")`
    position: absolute;
    top: 235px;
    left: 15px;
`;

const MarkerDiv = styled("div")`
    transition: all 100ms cubic-bezier(0.25, 0.1, 0.25, 1);
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    margin: none;
`;

const MarkerImg = styled("img")`
    transition: all 100ms cubic-bezier(0.25, 0.1, 0.25, 1);
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
`;

const MarkerLankDiv = styled("div")`
    text-align: center;
`;

const MarkerOverlay = (props) => {
    const dispatch = useDispatch();
    const subColor = useSelector((state) => state.color.subColor);
    const marker = useSelector((state) => state.markers.markers.filter((marker) => marker.id === props.id)[0]);
    const menuLevel = useSelector((state) => state.menuLevel.menuLevel);

    useEffect(() => {
        if (props.selected) {
            dispatch(setMapCenter(props.place.position, true));
        } else {
            dispatch(addMarker({ place: props.place, markerId: props.id }));
            return () => dispatch(deleteMarker(props.id));
        }
    }, []);

    const renderOverlay = () => {
        if (props.selected) {
            return (
                <>
                    <CustomOverlayMap position={props.place.position} zIndex={1}>
                        <MarkerDiv>
                            <MarkerImg
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    border: "none",
                                    borderRadius: "50%",
                                }}
                                alt="place"
                                src={`http://localhost:5001/places/image?placeId=${props.place.placeId}`}
                            ></MarkerImg>
                        </MarkerDiv>
                    </CustomOverlayMap>
                    <CustomOverlayMap position={props.place.position} xAnchor={0.5} yAnchor={1.2}>
                        <MarkerOverlayDiv style={{ backgroundColor: subColor }}>
                            <MarkerNameDiv>{props.place.placeName}</MarkerNameDiv>
                            <MarkerStarDiv>
                                <Tooltip
                                    title={`${(props.place.placeStar * 100).toFixed(2)} 점`}
                                    placement="right"
                                    arrow
                                >
                                    <CircularProgressWithLabelAndTooltip value={props.place.placeStar * 100} />
                                </Tooltip>
                            </MarkerStarDiv>
                            <MarkerAddressDiv>{props.place.placeAddress}</MarkerAddressDiv>
                            <MarkerLine style={{ top: "80px" }} />
                            <MarkerScrollbars>
                                <List>
                                    {props.place.placeReviews.map((review, index) => (
                                        <ListItem
                                            key={`selectedMarker-${index}`}
                                            alignItems="flex-start"
                                            sx={{ padding: "5px 0px 5px" }}
                                        >
                                            <Box sx={{ fontSize: "14px", whiteSpace: "normal" }}>{review}</Box>
                                        </ListItem>
                                    ))}
                                </List>
                            </MarkerScrollbars>
                            <MarkerLine style={{ top: "220px" }} />
                            <CloseButton
                                onClick={() => {
                                    dispatch(selectMarker(-1));
                                    if (menuLevel === 3) {
                                        dispatch(resetMenuLevel());
                                    }
                                }}
                            ></CloseButton>
                            <MarkerHashtag>
                                {props.place.placeHashtags.slice(0, 3).map((hashTag, index) => (
                                    <span key={index}>#{hashTag} </span>
                                ))}
                            </MarkerHashtag>
                            <MarkerFavoriteButton placeId={props.place.placeId}></MarkerFavoriteButton>
                        </MarkerOverlayDiv>
                    </CustomOverlayMap>
                </>
            );
        } else {
            return marker ? (
                <>
                    <CustomOverlayMap
                        position={props.place.position}
                        xAnchor={marker.isFixed ? 0.500001 : 0.5} // CusomOverlay reload하여 위치 조정
                        zIndex={marker.isFixed ? 1 : -1}
                    >
                        <MarkerDiv
                            onMouseOver={() => dispatch(showMarker(marker.id))}
                            onMouseOut={() => {
                                if (!marker.isFixed) {
                                    dispatch(closeMarker(marker.id));
                                }
                            }}
                            onClick={() => {
                                dispatch(fixMarker(marker.id));
                                dispatch(setMapCenter(props.place.position, true));
                            }}
                        >
                            <MarkerImg
                                style={
                                    marker.isFixed
                                        ? {
                                              width: "80px",
                                              height: "80px",
                                              border: "none",
                                              borderRadius: "50%",
                                          }
                                        : {
                                              width: "50px",
                                              height: "50px",
                                              border: "none",
                                              borderRadius: "50%",
                                          }
                                }
                                alt="place"
                                src={`http://localhost:5001/places/image?placeId=${props.place.placeId}`}
                            ></MarkerImg>
                            <MarkerLankDiv>{props.place.placeLank + 1}</MarkerLankDiv>
                        </MarkerDiv>
                    </CustomOverlayMap>
                    {marker.isShow ? (
                        <CustomOverlayMap position={props.place.position} xAnchor={0.5} yAnchor={1.2}>
                            <MarkerOverlayDiv style={{ backgroundColor: subColor }}>
                                <MarkerNameDiv>{props.place.placeName}</MarkerNameDiv>
                                <MarkerStarDiv>
                                    <Tooltip
                                        title={`${(props.place.placeStar * 100).toFixed(2)} 점`}
                                        placement="right"
                                        arrow
                                    >
                                        <CircularProgressWithLabelAndTooltip value={props.place.placeStar * 100} />
                                    </Tooltip>
                                </MarkerStarDiv>
                                <MarkerAddressDiv>{props.place.placeAddress}</MarkerAddressDiv>
                                <MarkerLine style={{ top: "80px" }} />
                                <MarkerScrollbars>
                                    <List>
                                        {props.place.placeReviews.map((review, index) => (
                                            <ListItem
                                                key={`${marker.id}${index}`}
                                                alignItems="flex-start"
                                                sx={{ padding: "5px 0px 5px" }}
                                            >
                                                <Box sx={{ fontSize: "14px", whiteSpace: "normal" }}>{review}</Box>
                                            </ListItem>
                                        ))}
                                    </List>
                                </MarkerScrollbars>
                                <MarkerLine style={{ top: "220px" }} />
                                <CloseButton
                                    onClick={() => {
                                        dispatch(closeMarker(marker.id));
                                        if (menuLevel === 3) dispatch(resetMenuLevel());
                                    }}
                                ></CloseButton>
                                <MarkerHashtag>
                                    {props.place.placeHashtags.slice(0, 3).map((hashTag, index) => (
                                        <span key={index}>#{hashTag} </span>
                                    ))}
                                </MarkerHashtag>
                                <MarkerMoreButton></MarkerMoreButton>
                                <MarkerFavoriteButton placeId={props.place.placeId}></MarkerFavoriteButton>
                            </MarkerOverlayDiv>
                        </CustomOverlayMap>
                    ) : null}
                </>
            ) : null;
        }
    };
    return <>{renderOverlay()}</>;
};

export default MarkerOverlay;
