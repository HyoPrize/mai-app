import styled from "styled-components";

const MenuListNav = styled("nav")`
    position: absolute;
    left: ${function (props) {
        switch (Number(props.menuLevel)) {
            case 0:
                return "-252px";
            case 1:
                return "0px";
            default:
                return "0px";
        }
    }};
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

    animation: ${function (props) {
        if (props.opening) {
            return "list-open-event 0.2s forwards ease-out";
        } else if (props.closing) {
            return "list-close-event 0.2s forwards ease-out";
        } else {
            return "none";
        }
    }};
    @keyframes list-open-event {
        0% {
            left: -252px;
        }
        100% {
            left: 0px;
        }
    }
    @keyframes list-close-event {
        0% {
            left: 0px;
        }
        100% {
            left: -252px;
        }
    }
`;

function MenuList(props) {
    return (
        <div>
            <MenuListNav {...props}>
                <ul>{props.children}</ul>
            </MenuListNav>
        </div>
    );
}

export default MenuList;
