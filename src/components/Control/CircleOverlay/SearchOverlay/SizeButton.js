import { useState } from "react";
import styled from "styled-components";
import { Icon } from "@blueprintjs/core";

const SizeButtonDiv = styled("div")`
    position: absolute;
    left: 35px;
    top: 7px;
    width: 20px;
    height: 20px;

    display: block;
    cursor: pointer;
`;

const SizeButton = (props) => {
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
};

export default SizeButton;
