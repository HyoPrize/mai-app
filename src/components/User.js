import { useState } from "react";
import styled from "styled-components";
import { Icon } from "@blueprintjs/core";

const UserIconBtn = styled("button")`
    position: absolute;
    right: 40px;
    top: 30px;
    width: 50px;
    height: 50px;
    background-color: black;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 2;
`;

const UserMenuDiv = styled("div")`
    position: absolute;
    right: 40px;
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

    animation: ${function (props) {
        if (props.opening) {
            console.log("asdf");
            return "open-event 0.2s forwards ease-out";
        } else if (props.closing) {
            return "close-event 0.2s forwards ease-out";
        } else {
            console.log("none");
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
    }
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
function UserIcon(props) {
    return <UserIconBtn onClick={props.onClick}></UserIconBtn>;
}

function UserMenu(props) {
    return (
        <UserMenuDiv {...props}>
            <UserMenuFlexBox>
                <UserMenuItemDiv className="clickable-text-hover">로그인</UserMenuItemDiv>
                <UserMenuItemDiv className="clickable-text-hover">회원가입</UserMenuItemDiv>
            </UserMenuFlexBox>
        </UserMenuDiv>
    );
}

function User() {
    const [opening, setOpening] = useState(false);
    const [closing, setClosing] = useState(false);
    const onClickUserIcon = () => {
        if (opening) {
            setOpening(false);
            setClosing(true);
        } else if (closing) {
            setOpening(true);
            setClosing(false);
        } else {
            setOpening(true);
            setClosing(false);
        }
        //setIsOpen((current) => !current);
    };

    return (
        <div>
            <UserIcon onClick={onClickUserIcon} opening={opening} closing={closing}></UserIcon>
            <UserMenu opening={opening} closing={closing}></UserMenu>
        </div>
    );
}

export default User;
