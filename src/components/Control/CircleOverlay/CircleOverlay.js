import { useState } from "react";
import styled from "styled-components";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import Search from "./SearchOverlay/Search";
import SearchButton from "./SearchOverlay/SearchButton";
import PositionLabel from "./SearchOverlay/PositionLabel";
import RangeLabel from "./SearchOverlay/RangeLabel";
import SizeButton from "./SearchOverlay/SizeButton";
import CloseButton from "./CloseButton";
import MarkerOverlay from "./MarkerOverlay/MarkerOverlay";
import { useDispatch, useSelector } from "react-redux";
import { deleteCircle } from "redux/actions/CircleAction";

//마우스 올리면 아래서 위로 열리게
//마우스 클릭하면 중심으로 이동하고 고정

const SearchResultDiv = styled("div")`
    /* background-color: #fffded95; */
    border-radius: 15px;
    height: 30px;
    width: 38px;
    border: 1px solid grey;
`;

const SearchOverlayDiv = styled("div")`
    /* background-color: #fffded95; */
    border-radius: 15px;
    height: ${function (props) {
        if (props.isOpen) {
            return "150px";
        } else {
            return "30px";
        }
    }};
    width: ${function (props) {
        if (props.isOpen) {
            return "250px";
        } else {
            return "60px";
        }
    }};

    border: 1px solid grey;
`;

const CircleOverlay = (props) => {
    const dispatch = useDispatch();
    const subColor = useSelector((state) => state.color.subColor);

    const [keywordValue, setKeywordValue] = useState(0);
    const [isOpen, setIsOpen] = useState(true);
    const [isSearched, setIsSearched] = useState(false);
    const [places, setPlaces] = useState([]);

    return (
        <>
            {isSearched ? (
                <>
                    {places.map((place) => {
                        const id = `marker-${place.placeKeyword}-${place.center.lat}-${place.center.lng}-${place.placeId}-${place.position.lat},${place.position.lng}`;
                        return (
                            <div key={id}>
                                {place.placeId > -1 ? (
                                    <MarkerOverlay id={id} place={place}></MarkerOverlay>
                                ) : (
                                    <CustomOverlayMap position={place.position}>{place.placeName}</CustomOverlayMap>
                                )}
                            </div>
                        );
                    })}
                    <SearchResultDiv style={{ backgroundColor: subColor }}>
                        <CloseButton onClick={() => dispatch(deleteCircle(props.circle))}></CloseButton>
                    </SearchResultDiv>
                </>
            ) : (
                <SearchOverlayDiv style={{ backgroundColor: subColor }} isOpen={isOpen}>
                    {isOpen ? (
                        <>
                            <Search keywordValue={keywordValue} setKeywordValue={setKeywordValue}></Search>
                            <SearchButton
                                lat={props.lat}
                                lon={props.lon}
                                distance={props.distance}
                                keywordValue={keywordValue}
                                setPlaces={setPlaces}
                                setIsSearched={setIsSearched}
                            ></SearchButton>
                            <PositionLabel lat={props.lat} lon={props.lon}></PositionLabel>
                            <RangeLabel distance={props.distance}></RangeLabel>
                        </>
                    ) : null}
                    <SizeButton isOpen={isOpen} setIsOpen={setIsOpen}></SizeButton>
                    <CloseButton onClick={() => dispatch(deleteCircle(props.circle))}></CloseButton>
                </SearchOverlayDiv>
            )}
        </>
    );
};

export default CircleOverlay;
