import styled from "styled-components";
import { useSelector } from "react-redux";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

const UserFrameDiv = styled("div")`
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

const UserFrame = () => {
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
        <UserFrameDiv style={{ right: getPixelFromMenuLevel() }}>
            <LoginPage></LoginPage>
            <RegisterPage></RegisterPage>
        </UserFrameDiv>
    );
};

export default UserFrame;
