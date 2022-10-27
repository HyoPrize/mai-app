import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { upMenuLevel, downMenuLevel } from "redux/actions/MenuLevelAction";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";

const StyledMenuItem = styled(ListItem)`
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: 60px;

    //border-radius: 10px;

    /* span {
        margin-left: 10px;
    } */

    /* .menu-item-icon {
        height: 70%;
        aspect-ratio: 1/1;
        border: 2px solid #ffb17a;
        border-radius: 10px;
    }

    :hover {
        box-shadow: 0px 1px 5px rgba(128, 128, 128);
    } */
`;

function MenuItem(props) {
    const dispatch = useDispatch();
    const menuLevel = useSelector((state) => state.menuLevel.menuLevel);

    const onclickMenuItem = () => {
        if (menuLevel === 1) {
            // Open MenuPage & Load MenuPage
            dispatch(upMenuLevel());
        } else if (menuLevel === 2) {
            // Load MenuPage
        } else if (menuLevel === 3) {
            // Close UserFrame & OpenMenuPage & Load MenuPage
            dispatch(downMenuLevel());
        }
    };

    return (
        <li>
            <StyledMenuItem className="clickable-text-hover" onClick={onclickMenuItem}>
                <ListItemButton>
                    <ListItemText>{props.name}</ListItemText>
                </ListItemButton>
            </StyledMenuItem>
            {/* <MenuItemDiv style={{ cursor: "pointer" }} className="clickable-text-hover" onClick={onclickMenuItem}>
                <span className="menu-item-icon"></span>
                <span className="menu-item-name">{props.name}</span>
            </MenuItemDiv> */}
        </li>
    );
}

export default MenuItem;
