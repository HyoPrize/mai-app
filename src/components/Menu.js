import { useState } from "react";
import MenuToggleButton from "../components/MenuToggleButton";
import MenuList from "./MenuList";
import MenuItem from "./MenuItem";
import MenuPage from "./MenuPage";

function Menu(props) {
    const [opening, setOpening] = useState(false);
    const [closing, setClosing] = useState(false);

    return (
        <div>
            <MenuList top="0px" menuLevel={props.menuLevel} opening={opening} closing={closing}>
                <MenuItem
                    clsasName="favorites"
                    name="즐겨찾기"
                    menuLevel={props.menuLevel}
                    setMenuLevel={props.setMenuLevel}
                    setOpening={setOpening}
                    setClosing={setClosing}
                ></MenuItem>
                <MenuItem
                    clsasName="history"
                    name="검색 기록"
                    menuLevel={props.menuLevel}
                    setMenuLevel={props.setMenuLevel}
                    setOpening={setOpening}
                    setClosing={setClosing}
                ></MenuItem>
                <MenuItem
                    clsasName="share"
                    name="MAI 공유"
                    menuLevel={props.menuLevel}
                    setMenuLevel={props.setMenuLevel}
                    setOpening={setOpening}
                    setClosing={setClosing}
                ></MenuItem>
            </MenuList>
            <MenuPage top="0px" menuLevel={props.menuLevel} setMenuLevel={props.setMenuLevel}></MenuPage>
            <MenuToggleButton
                top="40px"
                size="40px"
                menuLevel={props.menuLevel}
                opening={opening}
                closing={closing}
                setMenuLevel={props.setMenuLevel}
                setOpening={setOpening}
                setClosing={setClosing}
            ></MenuToggleButton>
        </div>
    );
}

export default Menu;
