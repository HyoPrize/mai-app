import { useState } from "react";
import MenuToggleButton from "components/Menu/MenuToggleButton";
import MenuPageFirst from "./MenuPageFirst";
import MenuItem from "./MenuItem";

function Menu(props) {
    return (
        <div>
            <MenuPageFirst top="0px"></MenuPageFirst>
            <MenuToggleButton top="40px" size="40px"></MenuToggleButton>
        </div>
    );
}

export default Menu;
