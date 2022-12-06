import { useEffect, useState } from "react";
import styled from "styled-components";
import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import CloseButton from "../CloseButton";
import { useDispatch, useSelector } from "react-redux";
import { setMapCenter } from "redux/actions/MapAction";
import { addMarker, closeMarker, deleteMarker, fixMarker, showMarker } from "redux/actions/MarkerAction";
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

const MarkerOverlay = (props) => {
    const dispatch = useDispatch();
    const subColor = useSelector((state) => state.color.subColor);
    const marker = useSelector((state) => state.markers.markers.filter((marker) => marker.id === props.id)[0]);
    const menuLevel = useSelector((state) => state.menuLevel.menuLevel);

    useEffect(() => {
        dispatch(addMarker({ placeId: props.place.placeId, markerId: props.id }));
        return () => dispatch(deleteMarker(props.id));
    }, []);

    return marker ? (
        <>
            <MapMarker
                position={props.place.position}
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
            ></MapMarker>
            {marker.isShow ? (
                <CustomOverlayMap position={props.place.position} xAnchor={0.5} yAnchor={1.2}>
                    <MarkerOverlayDiv style={{ backgroundColor: subColor }}>
                        <MarkerNameDiv>{props.place.placeName}</MarkerNameDiv>
                        <MarkerStarDiv>
                            <Tooltip title={`${(props.place.placeStar * 100).toFixed(2)} 점`} placement="right" arrow>
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
                            {props.place.placeHashtags.map((hashTag, index) => (
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
};

export default MarkerOverlay;
