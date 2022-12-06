import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCircle } from "redux/actions/CircleAction";
import { Icon } from "@blueprintjs/core";

const CloseButtonDiv = styled("div")`
    position: absolute;
    left: 10px;
    top: 6px;
    width: 20px;
    height: 20px;

    display: block;
    cursor: pointer;
`;

const CloseButton = (props) => {
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    const onClickButton = () => {
        props.onClick();
        //dispatch(deleteCircle(props.circle));
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
};

export default CloseButton;
