import { styled } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { closeUserToggle, openUserToggle } from "redux/actions/UserToggleAction";
import { Avatar } from "@mui/material";

const UserIconAvatar = styled(Avatar)({
    "&.MuiAvatar-circular": {
        position: "absolute",
        width: "60px",
        top: "30px",
        height: "60px",
        backgroundColor: (props) => props.backgroundColor,
        border: "none",
        borderRadius: "50%",
        cursor: "pointer",
        zIndex: 2,
        transition: "all 500ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
});

const UserIcon = () => {
    const dispatch = useDispatch();
    const menuLevel = useSelector((state) => state.menuLevel.menuLevel);
    const userToggle = useSelector((state) => state.userToggle.userToggle);
    const user = useSelector((state) => state.user);
    const userImageSrc = useSelector((state) => state.imageSrc.userImageSrc);

    const getPixelFromMenuLevel = () => {
        switch (menuLevel) {
            case 0:
            case 1:
            case 2:
                return "35px";
            case 3:
                return "435px";
            default:
                return "35px";
        }
    };

    const onClickUserIcon = () => {
        if (userToggle) {
            dispatch(closeUserToggle());
        } else {
            dispatch(openUserToggle());
        }
    };

    console.log(user);

    return (
        <div>
            <UserIconAvatar
                onClick={onClickUserIcon}
                style={{ right: getPixelFromMenuLevel() }}
                src={user.isLogin ? userImageSrc : ""}
                backgroundColor={user.isLogin ? "#FFFFFF" : "#FFB17A"}
            ></UserIconAvatar>
            {/* <UserIconBtn onClick={onClickUserIcon} style={{ right: getPixelFromMenuLevel() }} url={userImageSrc}>
            </UserIconBtn> */}
        </div>
    );
};

export default UserIcon;
