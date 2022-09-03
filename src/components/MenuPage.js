import styled from "styled-components";

import { useSelector } from "react-redux";

const MenuPageDiv = styled("div")`
    position: absolute;
    left: 250px;
    top: 0px;
    width: 500px;
    height: 100%;
    z-index: 1;
    border-left: 2px solid grey;
    border-right: 2px solid grey;

    background-color: #fffded95;
`;

function MenuPage(props) {
    const { menuLevel } = useSelector((state) => state.menuLevel);

    return <div>{menuLevel === 2 ? <MenuPageDiv></MenuPageDiv> : null}</div>;
}

export default MenuPage;
