import styled from "styled-components";

const RangeLabelDiv = styled("div")`
    position: absolute;
    top: 113px;
    left: 10px;
    width: 185px;
    height: 36px;

    display: flex;
    align-items: center;
    cursor: pointer;
`;

const RangeLabel = (props) => {
    return (
        <RangeLabelDiv className="clickable-text">
            <div style={{ padding: "15px" }}>범위</div>
            <div>{Number(props.distance).toLocaleString("ko-KR")} m</div>
        </RangeLabelDiv>
    );
};

export default RangeLabel;
