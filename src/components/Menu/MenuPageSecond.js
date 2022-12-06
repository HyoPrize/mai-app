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

    /* background-color: #fffded95; */
`;

function MenuPageSecond(props) {
    const menuLevel = useSelector((state) => state.menuLevel.menuLevel);
    const subColor = useSelector((state) => state.color.subColor);

    return (
        <div>
            {menuLevel === 2 ? <MenuPageSecondDiv style={{ backgroundColor: subColor }}></MenuPageSecondDiv> : null}
        </div>
    );
}

export default MenuPageSecond;
