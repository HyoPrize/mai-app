import styled from "styled-components";

import { useSelector } from "react-redux";

const MenuListNav = styled("nav")`
    position: absolute;

    top: 0px;
    width: 250px;
    height: 100%;
    z-index: 1;
    background-color: #fffded95;
    border-right: 2px solid grey;
    ul {
        list-style: none;
        padding-left: 0px;
        margin-top: 0px;
    }

    transition: all 500ms cubic-bezier(0.25, 0.1, 0.25, 1);
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
`;

function MenuList(props) {
    const { menuLevel } = useSelector((state) => state.menuLevel);

    console.log(menuLevel);
    const getPixelFromMenuLevel = () => {
        switch (menuLevel) {
            case 0:
                return "-252px";
            case 1:
                return "0px";
            default:
                return "0px";
        }
    };

    return (
        <div>
            <MenuListNav style={{ left: getPixelFromMenuLevel() }} {...props}>
                <ul>{props.children}</ul>
            </MenuListNav>
        </div>
    );
}

export default MenuList;
