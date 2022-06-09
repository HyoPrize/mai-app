import { useState } from "react";
import styled from "styled-components";

import MapCanvas from "../components/MapCanvas";
import Menu from "../components/Menu";
import User from "../components/User";
import ControlGroup from "../components/ControlGroup";

const ParentDiv = styled("div")`
    position: relative;
    overflow: hidden;
`;

function MapPage() {
    const [menuLevel, setMenuLevel] = useState(0);
    const [isCircleMode, setIsCircleMode] = useState(false);

    console.log(menuLevel);
    return (
        <ParentDiv>
            <MapCanvas isCircleMode={isCircleMode} setIsCircleMode={setIsCircleMode} />
            <Menu menuLevel={menuLevel} setMenuLevel={setMenuLevel}></Menu>
            <User menuLevel={menuLevel} setMenuLevel={setMenuLevel}></User>
            <ControlGroup
                menuLevel={menuLevel}
                isCircleMode={isCircleMode}
                setIsCircleMode={setIsCircleMode}
            ></ControlGroup>
        </ParentDiv>
    );
}

export default MapPage;
