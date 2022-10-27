import { useState } from "react";
import styled from "styled-components";
import { Icon } from "@blueprintjs/core";

import { useSelector, useDispatch } from "react-redux";
import { downMenuLevel, resetMenuLevel, upMenuLevel } from "redux/actions/MenuLevelAction";
import { cancelUserPage } from "redux/actions/UserPageStateAction";

const ButtonDiv = styled("div")`
    position: absolute;
    top: ${(props) => props.top};
    width: ${(props) => props.size / 2};
    height: ${(props) => props.size};
    overflow: hidden;
    z-index: 2;

    transition: ${function (props) {
        if (props.menuLevel !== 2) {
            return "all 500ms cubic-bezier(0.25, 0.1, 0.25, 1)";
        }
    }};
    transition-timing-function: ${function (props) {
        if (props.menuLevel !== 2) {
            return "all 500ms cubic-bezier(0.25, 0.1, 0.25, 1)";
        }
    }};
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

    const dispatch = useDispatch();
    const menuLevel = useSelector((state) => state.menuLevel.menuLevel);

    const iconSizeProp = Number(props.size.replace("px", "")) / 2;

    const onClickMenuBtn = () => {
        if (menuLevel === 0) {
            dispatch(upMenuLevel());
        } else if (menuLevel === 1) {
            dispatch(downMenuLevel());
        } else if (menuLevel === 2) {
            dispatch(downMenuLevel());
        } else if (menuLevel === 3) {
            dispatch(resetMenuLevel());
            dispatch(cancelUserPage());
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

    const getPixelFromMenuLevel = () => {
        switch (menuLevel) {
            case 0:
            case 3:
                return "0px";
            case 1:
                return "402px";
            case 2:
                return "802px";
            default:
                return "0px";
        }
    };

    return (
        <ButtonDiv {...props} menuLevel={menuLevel} style={{ left: getPixelFromMenuLevel() }}>
            <Button onClick={onClickMenuBtn} onMouseEnter={onMouseEnterMenuBtn} onMouseLeave={onMouseLeaveMenuBtn}>
                <Icon
                    icon={menuLevel === 0 ? "caret-right" : "caret-left"}
                    color={isMouseEnter ? "#FFB17A" : "grey"}
                    iconSize={iconSizeProp}
                />
            </Button>
        </ButtonDiv>
    );
}

export default MenuToggleButton;
