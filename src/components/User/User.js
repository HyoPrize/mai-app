import { useState } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { setLevel } from "redux/actions/MenuLevelAction";
import { closeUserToggle, openUserToggle } from "redux/actions/UserToggleAction";

const UserIconBtn = styled("button")`
    position: absolute;
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

    transition: all 500ms cubic-bezier(0.25, 0.1, 0.25, 1);
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
`;

function UserIcon() {
    const dispatch = useDispatch();
    const menuLevel = useSelector((state) => state.menuLevel.menuLevel);
    const userToggle = useSelector((state) => state.userToggle.userToggle);

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
        if (userToggle) {
            dispatch(closeUserToggle());
        } else {
            dispatch(openUserToggle());
        }
    };

    return <UserIconBtn onClick={onClickUserIcon} style={{ right: getPixelFromMenuLevel() }}></UserIconBtn>;
}

function UserMenu(props) {
    const dispatch = useDispatch();
    const menuLevel = useSelector((state) => state.menuLevel.menuLevel);
    const userToggle = useSelector((state) => state.userToggle.userToggle);

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

    const getPixelFromUserToggle = () => {
        if (userToggle) {
            return "250px";
        } else {
            return "50px";
        }
    };

    const getBorderRadiusFromUserToggle = () => {
        if (userToggle) {
            return "15px 25px 25px 15px";
        } else {
            return "25px 25px 25px 25px";
        }
    };

    return (
        <UserMenuDiv
            style={{
                right: getPixelFromMenuLevel(),
                width: getPixelFromUserToggle(),
                borderRadius: getBorderRadiusFromUserToggle(),
            }}
            {...props}
        >
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

function UserPage() {
    const menuLevel = useSelector((state) => state.menuLevel.menuLevel);

    const getPixelFromMenuLevel = () => {
        switch (menuLevel) {
            case 3:
                return "0px";
            default:
                return "-503px";
        }
    };

    return <UserPageDiv style={{ right: getPixelFromMenuLevel() }}></UserPageDiv>;
}

function User() {
    return (
        <>
            <UserIcon></UserIcon>
            <UserMenu></UserMenu>
            <UserPage></UserPage>
        </>
    );
}

export default User;
