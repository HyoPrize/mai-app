import styled from "styled-components";

import { useSelector } from "react-redux";

const MenuPageSecondDiv = styled("div")`
    position: absolute;
    left: 400px;
    top: 0px;
    width: 400px;
    height: 100%;
    z-index: 1;
    border-left: 2px solid grey;
    border-right: 2px solid grey;

    background-color: #fffded95;
`;

function MenuPageSecond(props) {
    const { menuLevel } = useSelector((state) => state.menuLevel);

    return <div>{menuLevel === 2 ? <MenuPageSecondDiv></MenuPageSecondDiv> : null}</div>;
}

export default MenuPageSecond;
