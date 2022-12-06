import { Icon } from "@blueprintjs/core";
import ControlDiv from "styles/ControlDiv";
// import ControlButton from "styles/ControlButton";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toggleCircleMode } from "redux/actions/CircleModeAction";
import styled from "styled-components";

const ControlButton = styled("button")`
    width: 100%;
    height: 100%;
    padding: 5px 0px 0px 0px;
    /* background-color: ${function (props) {
        if (props.isCircleMode) {
            return "#FFB17A90";
        } else {
            return "#fffded90";
        }
    }}; */
    border-radius: 15px;
    border: 2px solid grey;

    display: block;
    cursor: pointer;
`;

function CircleModeControl(props) {
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    const dispatch = useDispatch();
    const menuLevel = useSelector((state) => state.menuLevel.menuLevel);
    const isCircleMode = useSelector((state) => state.circleMode.isCircleMode);
    const mainColor = useSelector((state) => state.color.mainColor);
    const subColor = useSelector((state) => state.color.subColor);

    const onClickButton = () => {
        if (isCircleMode) {
            props.setIsDrawing(false);
        }
        dispatch(toggleCircleMode());
    };

    const onMouseEnter = () => {
        setIsMouseEnter(true);
    };

    const onMouseLeave = () => {
        setIsMouseEnter(false);
    };

    const getPixelFromMenuLevel = () => {
        switch (menuLevel) {
            case 0:
            case 1:
            case 2:
                return "40px";
            case 3:
                return "440px";
            default:
                return "40px";
        }
    };

    return (
        <ControlDiv style={{ width: "50px", height: "50px", right: getPixelFromMenuLevel(), top: "100px" }}>
            <ControlButton
                isCircleMode={isCircleMode}
                onClick={onClickButton}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={isCircleMode ? { backgroundColor: mainColor } : { backgroundColor: subColor }}
            >
                <Icon
                    icon={"add-location"}
                    color={isCircleMode ? (isMouseEnter ? "white" : "grey") : isMouseEnter ? "#FFB17A" : "grey"}
                    iconSize={25}
                />
            </ControlButton>
        </ControlDiv>
    );
}

export default CircleModeControl;
