import { useState } from "react";
import styled from "styled-components";
import { Icon } from "@blueprintjs/core";

const ButtonDiv = styled("div")`
    position: absolute;
    left: ${function (props) {
        switch (Number(props.menuLevel)) {
            case 0:
                return "0px";
            case 1:
            case 3:
                return "252px";
            case 2:
                return "754px";
            default:
                return "0px";
        }
    }};
    top: ${(props) => props.top};
    width: ${(props) => props.size / 2};
    height: ${(props) => props.size};
    overflow: hidden;
    z-index: 2;

    animation: ${function (props) {
        if (props.opening) {
            return "btn-open-event 0.2s forwards";
        } else if (props.closing) {
            return "btn-close-event 0.2s forwards";
        } else {
            return "none";
        }
    }};

    @keyframes btn-open-event {
        0% {
            left: 0px;
        }
        100% {
            left: 252px;
        }
    }
    @keyframes btn-close-event {
        0% {
            left: 252px;
        }
        100% {
            left: 0px;
        }
    }
`;

const Button = styled("button")`
    width: 100%;
    height: 100%;

    background-color: #fffded90;
    padding: 3px 0px 0px 0px;
    border: 2px solid grey;
    border-left: none;
    border-radius: 0 20% 20% 0;

    display: block;
    cursor: pointer;

    :hover {
        background-color: #fffded;
    }
`;

function MenuToggleButton({ ...props }) {
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    const iconSizeProp = Number(props.size.replace("px", "")) / 2;

    const onClickMenuBtn = () => {
        if (props.menuLevel === 0) {
            props.setMenuLevel((current) => current + 1);
            props.setOpening(true);
            props.setClosing(false);
        } else if (props.menuLevel === 1) {
            props.setMenuLevel((current) => current - 1);
            props.setOpening(false);
            props.setClosing(true);
        } else if (props.menuLevel === 2) {
            props.setOpening(false);
            props.setClosing(false);
            props.setMenuLevel((current) => current - 1);
        } else if (props.menuLevel === 3) {
            props.setMenuLevel(0);
            props.setOpening(false);
            props.setClosing(true);
        } else {
            console.log("MenuLevel Error");
        }
    };

    function onMouseEnterMenuBtn() {
        setIsMouseEnter(true);
    }
    function onMouseLeaveMenuBtn() {
        setIsMouseEnter(false);
    }

    return (
        <ButtonDiv
            opening={props.opening}
            setOpening={props.setOpening}
            closing={props.closing}
            setClosing={props.setClosing}
            {...props}
        >
            <Button onClick={onClickMenuBtn} onMouseEnter={onMouseEnterMenuBtn} onMouseLeave={onMouseLeaveMenuBtn}>
                <Icon
                    icon={props.menuLevel === 0 ? "caret-right" : "caret-left"}
                    color={isMouseEnter ? "#FFB17A" : "grey"}
                    iconSize={iconSizeProp}
                />
            </Button>
        </ButtonDiv>
    );
}

export default MenuToggleButton;
