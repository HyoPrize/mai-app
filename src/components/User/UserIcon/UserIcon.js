import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
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

const UserIcon = () => {
    const dispatch = useDispatch();
    const menuLevel = useSelector((state) => state.menuLevel.menuLevel);
    const userToggle = useSelector((state) => state.userToggle.userToggle);
    const isLogin = useSelector((state) => state.user.isLogin);

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

    const onClickUserIcon = () => {
        if (userToggle) {
            dispatch(closeUserToggle());
        } else {
            dispatch(openUserToggle());
        }
    };

    return (
        <UserIconBtn
            onClick={onClickUserIcon}
            style={{ right: getPixelFromMenuLevel(), backgroundColor: isLogin ? "red" : "black" }}
        ></UserIconBtn>
    );
};

export default UserIcon;
