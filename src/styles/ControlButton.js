import styled from "styled-components";

const ControlButton = styled("button")`
    width: 100%;
    height: 100%;
    padding: 5px 0px 0px 0px;
    background-color: ${function (props) {
        if (props.isCircleMode) {
            return "#FFB17A90";
        } else {
            return "#fffded90";
        }
    }};
    border-radius: 15px;
    border: 2px solid grey;

    display: block;
    cursor: pointer;
`;

export default ControlButton;
