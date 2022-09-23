import { Icon } from "@blueprintjs/core";
import ControlDiv from "styles/ControlDiv";
import ControlButton from "styles/ControlButton";
import { useState } from "react";

import { useSelector } from "react-redux";

function CircleModeControl(props) {
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    const menuLevel = useSelector((state) => state.menuLevel.menuLevel);

    const onClickButton = () => {
        props.setIsCircleMode((current) => !current);
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
                return "540px";
            default:
                return "40px";
        }
    };

    return (
        <ControlDiv style={{ right: getPixelFromMenuLevel(), top: "100px" }}>
            <ControlButton {...props} onClick={onClickButton} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <Icon
                    icon={"add-location"}
                    color={props.isCircleMode ? (isMouseEnter ? "white" : "grey") : isMouseEnter ? "#FFB17A" : "grey"}
                    iconSize={25}
                />
            </ControlButton>
        </ControlDiv>
    );
}

export default CircleModeControl;
