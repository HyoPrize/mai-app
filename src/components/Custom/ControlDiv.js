import styled from "styled-components";

const ControlDiv = styled("div")`
    position: absolute;
    z-index: 2;

    transition: all 500ms cubic-bezier(0.25, 0.1, 0.25, 1);
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
`;

export default ControlDiv;
