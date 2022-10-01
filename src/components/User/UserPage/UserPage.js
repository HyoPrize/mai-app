import styled from "styled-components";
import { useSelector } from "react-redux";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

const UserPageDiv = styled("div")`
    position: absolute;
    right: 0px;
    top: 0px;
    width: 400px;
    height: 100%;
    z-index: 1;
    border-left: 2px solid grey;
    border-right: 2px solid grey;
    background-color: #fffded95;

    transition: all 500ms cubic-bezier(0.25, 0.1, 0.25, 1);
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
`;

const UserPage = () => {
    const menuLevel = useSelector((state) => state.menuLevel.menuLevel);

    const getPixelFromMenuLevel = () => {
        switch (menuLevel) {
            case 3:
                return "0px";
            default:
                return "-503px";
        }
    };

    return (
        <UserPageDiv style={{ right: getPixelFromMenuLevel() }}>
            <SignIn></SignIn>
            <SignUp></SignUp>
        </UserPageDiv>
    );
};

export default UserPage;
