import styled from "styled-components";

const ControlDiv = styled("div")`
    position: absolute;
    right: ${function (props) {
        switch (Number(props.menuLevel)) {
            case 0:
            case 1:
            case 2:
                return "40px";
            case 3:
                return "540px";
            default:
                return "40px";
        }
    }};
    top: ${(props) => props.top};
    width: 50px;
    height: 50px;
    z-index: 2;
`;

export default ControlDiv;
