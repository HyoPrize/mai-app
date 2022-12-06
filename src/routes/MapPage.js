import { useState } from "react";
import styled from "styled-components";

import MapCanvas from "../components/Map/MapCanvas";
import Menu from "../components/Menu/Menu";
import User from "../components/User/User";
import ControlGroup from "../components/Control/ControlGroup/ControlGroup";

const ParentDiv = styled("div")`
    position: relative;
    overflow: hidden;
`;

function MapPage() {
    const [isDrawing, setIsDrawing] = useState(false);

    return (
        <ParentDiv>
            <MapCanvas isDrawing={isDrawing} setIsDrawing={setIsDrawing} />
            <Menu></Menu>
            <User></User>
            <ControlGroup setIsDrawing={setIsDrawing}></ControlGroup>
        </ParentDiv>
    );
}

export default MapPage;
