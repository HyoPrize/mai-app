import styled from "styled-components";

import MapCanvas from "../components/MapCanvas";
import Menu from "../components/Menu";

const ParentDiv = styled("div")`
    position: relative;
    overflow: hidden;
`;

function Map() {
    return (
        <ParentDiv>
            <MapCanvas />
            <Menu></Menu>
        </ParentDiv>
    );
}

export default Map;
