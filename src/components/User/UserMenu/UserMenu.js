import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setLevel } from "redux/actions/MenuLevelAction";
import { signIn, signUp } from "redux/actions/UserSignAction";

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

const UserMenu = (props) => {
    const dispatch = useDispatch();
    const menuLevel = useSelector((state) => state.menuLevel.menuLevel);
    const userToggle = useSelector((state) => state.userToggle.userToggle);

    const onClickSignIn = () => {
        dispatch(setLevel(3));
        dispatch(signIn());
    };

    const onClickSignUp = () => {
        dispatch(setLevel(3));
        dispatch(signUp());
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
            }}
            {...props}
        >
            <UserMenuFlexBox>
                <UserMenuItemDiv onClick={onClickSignIn} className="clickable-text-hover">
                    로그인
                </UserMenuItemDiv>
                <UserMenuItemDiv onClick={onClickSignUp} className="clickable-text-hover">
                    회원가입
                </UserMenuItemDiv>
            </UserMenuFlexBox>
        </UserMenuDiv>
    );
};

export default UserMenu;
