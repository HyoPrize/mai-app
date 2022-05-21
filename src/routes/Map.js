import styled from "styled-components";

import MapCanvas from "../components/MapCanvas";
import Menu from "../components/Menu";
import User from "../components/User";

const ParentDiv = styled("div")`
    position: relative;
    overflow: hidden;
`;

function Map() {
    return (
        <ParentDiv>
            <MapCanvas />
            <Menu></Menu>
            <User></User>
        </ParentDiv>
    );
}

export default Map;
