import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { resetMenuLevel, setMenuLevel } from "redux/actions/MenuLevelAction";
import { setUserPage } from "redux/actions/UserPageStateAction";
import { logout } from "redux/actions/UserAction";
import { closeUserToggle } from "redux/actions/UserToggleAction";

const UserMenuDiv = styled("div")`
    position: absolute;
    top: 35px;
    width: 50px;
    height: 50px;
    /* background-color: #fffded95; */
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

const UserMenu = (props) => {
    const dispatch = useDispatch();
    const menuLevel = useSelector((state) => state.menuLevel.menuLevel);
    const userToggle = useSelector((state) => state.userToggle.userToggle);
    const isLogin = useSelector((state) => state.user.isLogin);
    const subColor = useSelector((state) => state.color.subColor);

    const onClickUserInfo = () => {
        dispatch(setMenuLevel(3));
        dispatch(setUserPage("userInfo"));
    };

    const onClickLogout = () => {
        dispatch(logout());
        dispatch(resetMenuLevel());
        dispatch(closeUserToggle());
        const oldToken = localStorage.getItem("token");
        if (oldToken) {
            localStorage.removeItem("token");
        }
    };

    const onClickLogin = () => {
        dispatch(setMenuLevel(3));
        dispatch(setUserPage("login"));
    };

    const onClickRegister = () => {
        dispatch(setMenuLevel(3));
        dispatch(setUserPage("register"));
    };

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
                backgroundColor: subColor,
            }}
            {...props}
        >
            <UserMenuFlexBox>
                {isLogin ? (
                    <>
                        <UserMenuItemDiv onClick={onClickUserInfo} className="clickable-text-hover">
                            내정보
                        </UserMenuItemDiv>
                        <UserMenuItemDiv onClick={onClickLogout} className="clickable-text-hover">
                            로그아웃
                        </UserMenuItemDiv>
                    </>
                ) : (
                    <>
                        <UserMenuItemDiv onClick={onClickLogin} className="clickable-text-hover">
                            로그인
                        </UserMenuItemDiv>
                        <UserMenuItemDiv onClick={onClickRegister} className="clickable-text-hover">
                            회원가입
                        </UserMenuItemDiv>
                    </>
                )}
            </UserMenuFlexBox>
        </UserMenuDiv>
    );
};

export default UserMenu;
