import { useState } from "react";
import MenuToggleButton from "../components/MenuToggleButton";
import MenuList from "./MenuList";
import MenuItem from "./MenuItem";
import MenuPage from "./MenuPage";

function Menu() {
    const [menuLevel, setMenuLevel] = useState(0);
    const [opening, setOpening] = useState(false);
    const [closing, setClosing] = useState(false);

    return (
        <div>
            <MenuList top="0px" menuLevel={menuLevel} opening={opening} closing={closing}>
                <MenuItem
                    clsasName="favorites"
                    name="즐겨찾기"
                    menuLevel={menuLevel}
                    setMenuLevel={setMenuLevel}
                    setOpening={setOpening}
                    setClosing={setClosing}
                ></MenuItem>
                <MenuItem
                    clsasName="history"
                    name="검색 기록"
                    menuLevel={menuLevel}
                    setMenuLevel={setMenuLevel}
                    setOpening={setOpening}
                    setClosing={setClosing}
                ></MenuItem>
                <MenuItem
                    clsasName="share"
                    name="MAI 공유"
                    menuLevel={menuLevel}
                    setMenuLevel={setMenuLevel}
                    setOpening={setOpening}
                    setClosing={setClosing}
                ></MenuItem>
            </MenuList>

            <MenuPage top="0px" menuLevel={menuLevel}></MenuPage>

            <MenuToggleButton
                top="40px"
                size="40px"
                menuLevel={menuLevel}
                setMenuLevel={setMenuLevel}
                opening={opening}
                setOpening={setOpening}
                closing={closing}
                setClosing={setClosing}
            ></MenuToggleButton>
        </div>
    );
}

export default Menu;
