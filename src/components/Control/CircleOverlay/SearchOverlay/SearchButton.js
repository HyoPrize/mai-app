import styled from "styled-components";
import { Icon } from "@blueprintjs/core";
import { useState } from "react";
import { getSearchableKeywordLabel } from "utils/publicData";
import { placeSearch, placeSearchInRadius } from "utils/kakaoUtil";
import swal from "sweetalert";
import { predictStar } from "utils/UniverseModel";

const SearchButtonDiv = styled("div")`
    position: absolute;
    top: 36px;
    left: 205px;
    width: 36px;
    height: 36px;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const SearchButton = (props) => {
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    const onClickButton = () => {
        const keyword = getSearchableKeywordLabel(props.keywordValue);
        const getPlaceInRadius = async () => {
            const placeIdList = await placeSearchInRadius(keyword, props.lat, props.lon, props.distance);

            if (placeIdList) {
                let places = [];
                if (placeIdList.length > 0) {
                    const token = localStorage.getItem("token");
                    if (!token) return;

                    const response = await fetch("http://localhost:5001/places/query", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: token,
                        },
                        body: JSON.stringify({ placeIdList: placeIdList }),
                    });
                    const data = await response.json();
                    if (data.isFound) {
                        let placeInfoList = data.placeInfoList;

                        for (let i in placeInfoList) {
                            placeInfoList[i].placeStar = await predictStar(placeInfoList[i].placeTokens);
                        }
                        placeInfoList.sort((a, b) => {
                            return a.placeStar < b.placeStar ? 1 : a.placeStar > b.placeStar ? -1 : 0;
                        });
                        placeInfoList = placeInfoList.slice(0, 10);

                        for await (let placeInfo of placeInfoList) {
                            places.push({
                                placeId: placeInfo.placeId,
                                position: {
                                    lat: placeInfo.placeY,
                                    lng: placeInfo.placeX,
                                },
                                placeName: placeInfo.placeName,
                                placeAddress: placeInfo.placeAddress,
                                placeReviews: placeInfo.placeReviews,
                                placeKeyword: keyword,
                                placeHashtags: placeInfo.placeHashtags,
                                placeStar: placeInfo.placeStar,
                                center: {
                                    lat: props.lat,
                                    lng: props.lon,
                                },
                            });
                        }
                    } else {
                        places.push({
                            placeId: -1,
                            position: {
                                lat: props.lat,
                                lng: props.lon,
                            },
                            placeName: "추천할만한 장소를 찾지 못했습니다.",
                            placeAddress: null,
                            placeReviews: null,
                            placeKeyword: keyword,
                            placeHashtags: null,
                            center: {
                                lat: props.lat,
                                lng: props.lon,
                            },
                        });
                    }
                    props.setPlaces(places);
                    props.setIsSearched(true);
                } else {
                    places.push({
                        placeId: -1,
                        position: {
                            lat: props.lat,
                            lng: props.lon,
                        },
                        placeName: "추천할만한 장소를 찾지 못했습니다.",
                        placeAddress: null,
                        placeReviews: null,
                        placeKeyword: keyword,
                        center: {
                            lat: props.lat,
                            lng: props.lon,
                        },
                    });
                }
                props.setPlaces(places);
                props.setIsSearched(true);
            } else {
                swal("Failed", "로그인 후 이용해주세요.", "error");
            }
        };
        getPlaceInRadius();
    };

    const onMouseEnter = () => {
        setIsMouseEnter(true);
    };

    const onMouseLeave = () => {
        setIsMouseEnter(false);
    };

    return (
        <SearchButtonDiv onClick={onClickButton} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Icon icon={"search"} color={isMouseEnter ? "#FFB17A" : "grey"} size={20}></Icon>
        </SearchButtonDiv>
    );
};

export default SearchButton;
