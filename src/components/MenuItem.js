import styled from "styled-components";

const MenuItemDiv = styled("div")`
    display: flex;
    justify-content: left;
    align-items: center;
    width: 95%;
    height: 50px;
    margin: 2.5% 0 2.5% 2.5%;

    border-radius: 10px;

    span {
        margin-left: 10px;
    }

    .menu-item-icon {
        height: 70%;
        aspect-ratio: 1/1;
        border: 2px solid #ffb17a;
        border-radius: 10px;
    }

    :hover {
        box-shadow: 0px 1px 5px rgba(128, 128, 128);
    }
`;

function MenuItem(props) {
    const onclickMenuItem = () => {
        if (props.menuLevel === 1) {
            // Open MenuPage & Load MenuPage
            props.setOpening(false);
            props.setClosing(false);
            props.setMenuLevel(2);
        } else if (props.menuLevel === 2) {
            // Load MenuPage
        } else if (props.menuLevel === 3) {
            // Close UserPage & OpenMenuPage & Load MenuPage
            props.setOpening(false);
            props.setClosing(false);
            props.setMenuLevel(2);
        }
    };

    return (
        <li>
            <MenuItemDiv style={{ cursor: "pointer" }} className="clickable-text-hover" onClick={onclickMenuItem}>
                <span className="menu-item-icon"></span>
                <span className="menu-item-name">{props.name}</span>
            </MenuItemDiv>
        </li>
    );
}

export default MenuItem;
