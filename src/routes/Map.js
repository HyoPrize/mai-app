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
    const [isCircleMode, setIsCircleMode] = useState(false);

    return (
        <ParentDiv>
            <MapCanvas isCircleMode={isCircleMode} setIsCircleMode={setIsCircleMode} />
            <Menu></Menu>
            <User></User>
            <ControlGroup isCircleMode={isCircleMode} setIsCircleMode={setIsCircleMode}></ControlGroup>
        </ParentDiv>
    );
}

export default MapPage;
