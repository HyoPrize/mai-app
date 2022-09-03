import { useState } from "react";
import MenuToggleButton from "../components/MenuToggleButton";
import MenuList from "./MenuList";
import MenuItem from "./MenuItem";
import MenuPage from "./MenuPage";

function Menu(props) {
    return (
        <div>
            <MenuList top="0px">
                <MenuItem clsasName="favorites" name="즐겨찾기"></MenuItem>
                <MenuItem clsasName="history" name="검색 기록"></MenuItem>
                <MenuItem clsasName="share" name="MAI 공유"></MenuItem>
            </MenuList>
            <MenuPage top="0px"></MenuPage>
            <MenuToggleButton top="40px" size="40px"></MenuToggleButton>
        </div>
    );
}

export default Menu;
