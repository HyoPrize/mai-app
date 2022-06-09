import { useState } from "react";
import styled from "styled-components";
import { Icon } from "@blueprintjs/core";
import Select from "react-select";
import latlong from "../utils/calc_latlong";

const CircleOverlayDiv = styled("div")`
    background-color: #fffded95;
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

const SearchDiv = styled("div")`
    position: absolute;
    top: 35px;
    left: 10px;
    width: 190px;
`;

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

const PositionLabelDiv = styled("div")`
    position: absolute;
    top: 80px;
    left: 10px;
    width: 225px;
    height: 36px;

    display: flex;
    align-items: center;
    cursor: pointer;
`;

const PositionLabelTextDiv = styled("div")`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;

    :hover {
        overflow: visible;
    }
`;

const RangeLabelDiv = styled("div")`
    position: absolute;
    top: 113px;
    left: 10px;
    width: 185px;
    height: 36px;

    display: flex;
    align-items: center;
    cursor: pointer;
`;

const SizeButtonDiv = styled("div")`
    position: absolute;
    left: 35px;
    top: 7px;
    width: 20px;
    height: 20px;

    display: block;
    cursor: pointer;
`;

const CloseButtonDiv = styled("div")`
    position: absolute;
    left: 10px;
    top: 6px;
    width: 20px;
    height: 20px;

    display: block;
    cursor: pointer;
`;

function Search() {
    const tags = [
        { value: 0, label: "A" },
        { value: 1, label: "B" },
        { value: 2, label: "C" },
        { value: 3, label: "D" },
        { value: 4, label: "E" },
        { value: 5, label: "F" },
    ];

    return (
        <SearchDiv>
            <Select
                defaultValue={{ value: -1, label: "NONE" }}
                options={tags}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: "#FFB17A90",
                        primary: "#FFB17A",
                    },
                })}
            ></Select>
        </SearchDiv>
    );
}

function SearchButton(props) {
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    const onClickButton = () => {};

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
}

function PositionLabel(props) {
    const [isAddress, setIsAddress] = useState(false);

    const onClickButton = () => {
        setIsAddress((current) => !current);
    };

    return (
        <PositionLabelDiv>
            {isAddress ? (
                <>
                    <div className="clickable-text-hover" onClick={onClickButton} style={{ padding: "8px" }}>
                        경위도
                    </div>
                    {latlong(props.lon)} <br></br> {latlong(props.lat)}
                </>
            ) : (
                <>
                    <div className="clickable-text-hover" onClick={onClickButton} style={{ padding: "15px" }}>
                        주소
                    </div>
                    <PositionLabelTextDiv>경기도 화성시 수노을1로 107 206동 1704호</PositionLabelTextDiv>
                </>
            )}
        </PositionLabelDiv>
    );
}

function RangeLabel(props) {
    return (
        <RangeLabelDiv>
            <div style={{ padding: "15px" }}>범위</div>
            <div>{Number(props.distance).toLocaleString("ko-KR")} m</div>
        </RangeLabelDiv>
    );
}

function SizeButton(props) {
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    const onClickButton = () => {
        props.setIsOpen((current) => !current);
    };

    const onMouseEnter = () => {
        setIsMouseEnter(true);
    };

    const onMouseLeave = () => {
        setIsMouseEnter(false);
    };

    return (
        <SizeButtonDiv onClick={onClickButton} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Icon
                icon={props.isOpen ? "minimize" : "maximize"}
                color={isMouseEnter ? "#FFB17A" : "grey"}
                size={15}
            ></Icon>
        </SizeButtonDiv>
    );
}

function CloseButton(props) {
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    const onClickButton = () => {
        props.setCircles((current) =>
            current.filter((circle) => {
                return circle !== props.circle;
            })
        );
    };

    const onMouseEnter = () => {
        setIsMouseEnter(true);
    };

    const onMouseLeave = () => {
        setIsMouseEnter(false);
    };

    return (
        <CloseButtonDiv onClick={onClickButton} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Icon icon={"cross"} color={isMouseEnter ? "#FFB17A" : "grey"} size={20}></Icon>
        </CloseButtonDiv>
    );
}

function CircleOverlay(props) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <CircleOverlayDiv isOpen={isOpen}>
            {isOpen ? (
                <>
                    <Search />
                    <SearchButton></SearchButton>
                    <PositionLabel lat={props.lat} lon={props.lon}></PositionLabel>
                    <RangeLabel distance={props.distance}></RangeLabel>
                </>
            ) : null}
            <SizeButton isOpen={isOpen} setIsOpen={setIsOpen}></SizeButton>
            <CloseButton circle={props.circle} setCircles={props.setCircles}></CloseButton>
        </CircleOverlayDiv>
    );
}

export default CircleOverlay;
