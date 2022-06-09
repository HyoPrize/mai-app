import { Icon } from "@blueprintjs/core";
import ControlDiv from "../styles/ControlDiv";
import ControlButton from "../styles/ControlButton";
import { useState } from "react";

function CircleModeControl(props) {
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    const onClickButton = () => {
        props.setIsCircleMode((current) => !current);
    };

    const onMouseEnter = () => {
        setIsMouseEnter(true);
    };

    const onMouseLeave = () => {
        setIsMouseEnter(false);
    };

    return (
        <ControlDiv menuLevel={props.menuLevel} top="100px">
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
