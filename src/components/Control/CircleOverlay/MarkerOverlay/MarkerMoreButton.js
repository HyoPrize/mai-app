import { ReadMore } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMenuLevel } from "redux/actions/MenuLevelAction";
import { setUserPage } from "redux/actions/UserPageStateAction";
import styled from "styled-components";

const MarkerMoreButtonDiv = styled("div")`
    position: absolute;
    top: 260px;
    left: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const MarkerMoreButton = (props) => {
    const dispatch = useDispatch();
    const [color, setColor] = useState("#808080");

    const onMouseEnter = () => {
        setColor("#FFB17A");
    };

    const onMouseLeave = () => {
        setColor("#808080");
    };

    const onClickButton = () => {
        dispatch(setMenuLevel(3));
        dispatch(setUserPage("markerMore"));
    };

    return (
        <MarkerMoreButtonDiv onClick={onClickButton} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div style={{ color: color }}>더보기</div>
            <ReadMore sx={{ color: color }}></ReadMore>
        </MarkerMoreButtonDiv>
    );
};

export default MarkerMoreButton;
