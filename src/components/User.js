import { useState } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { setLevel } from "redux/actions/menuLevelAction";

const UserIconBtn = styled("button")`
    position: absolute;
    /* right: ${function (props) {
        switch (Number(props.menuLevel)) {
            case 0:
            case 1:
            case 2:
                return "40px";
            case 3:
                return "540px";
            default:
                return "40px";
        }
    }}; */

    top: 30px;
    width: 50px;
    height: 50px;
    background-color: black;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 2;

    transition: all 500ms cubic-bezier(0.25, 0.1, 0.25, 1);
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
`;

const UserMenuDiv = styled("div")`
    position: absolute;
    top: 30px;
    width: 50px;
    height: 50px;
    background-color: #fffded95;
    border-radius: ${function (props) {
        if (props.opening) {
            return "15px 25px 25px 15px";
        } else if (props.closing) {
            return "25px 25px 25px 25px";
        } else {
            return "25px 25px 25px 25px";
        }
    }};
    z-index: 1;

    transition: all 500ms cubic-bezier(0.25, 0.1, 0.25, 1);
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    /* animation: ${function (props) {
        if (props.opening) {
            return "open-event 0.2s forwards ease-out";
        } else if (props.closing) {
            return "close-event 0.2s forwards ease-out";
        } else {
            return "none";
        }
    }};
    @keyframes open-event {
        0% {
            width: 50px;
        }
        100% {
            width: 250px;
        }
    }
    @keyframes close-event {
        0% {
            width: 250px;
        }
        100% {
            width: 50px;
        }
    } */
`;

const UserMenuFlexBox = styled("div")`
    display: flex;
    width: 100%;
    height: 100%;
`;

const UserMenuItemDiv = styled("div")`
    display: flex;
    margin-left: 10px;
    padding: 16px 5px 15px 5px;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
    align-items: center;
`;

const UserPageDiv = styled("div")`
    position: absolute;
    right: 0px;
    top: 0px;
    width: 500px;
    height: 100%;
    z-index: 1;
    border-left: 2px solid grey;
    border-right: 2px solid grey;

    background-color: #fffded95;
`;

function UserIcon(props) {
    const dispatch = useDispatch();
    const menuLevel = useSelector((state) => state.menuLevel);

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

    const onClickUserIcon = () => {
        if (props.opening) {
            props.setOpening(false);
            props.setClosing(true);
        } else if (props.closing) {
            props.setOpening(true);
            props.setClosing(false);
        } else {
            props.setOpening(true);
            props.setClosing(false);
        }
        //setIsOpen((current) => !current);
    };

    return <UserIconBtn onClick={onClickUserIcon} style={{ right: getPixelFromMenuLevel() }}></UserIconBtn>;
}

function UserMenu(props) {
    const dispatch = useDispatch();
    const menuLevel = useSelector((state) => state.menuLevel);

    const onClickLogin = () => {
        dispatch(setLevel(3));
    };

    const onClickSignUp = () => {
        dispatch(setLevel(3));
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
        <UserMenuDiv style={{ right: getPixelFromMenuLevel() }} {...props}>
            <UserMenuFlexBox>
                <UserMenuItemDiv onClick={onClickLogin} className="clickable-text-hover">
                    로그인
                </UserMenuItemDiv>
                <UserMenuItemDiv onClick={onClickSignUp} className="clickable-text-hover">
                    회원가입
                </UserMenuItemDiv>
            </UserMenuFlexBox>
        </UserMenuDiv>
    );
}

function UserPage(props) {
    return <div>{props.menuLevel === 3 ? <UserPageDiv></UserPageDiv> : null}</div>;
}

function User(props) {
    return (
        <div>
            <UserIcon></UserIcon>
            <UserMenu></UserMenu>
            <UserPage></UserPage>
        </div>
    );
}

export default User;
