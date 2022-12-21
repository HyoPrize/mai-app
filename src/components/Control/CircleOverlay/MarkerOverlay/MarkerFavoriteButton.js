import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "redux/actions/FavoriteAction";
import styled from "styled-components";

const MarkerFavoriteButtonDiv = styled("div")`
    position: absolute;
    top: 255px;
    right: 17px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const MarkerFavoriteButton = (props) => {
    const dispatch = useDispatch();
    const [color, setColor] = useState("#808080");
    const favorite = useSelector(
        (state) =>
            state.favorite.favorites.filter(
                (favorite) =>
                    favorite.placeId === props.place.placeId && favorite.placeKeyword === props.place.placeKeyword
            )[0]
    );
    const isLogin = useSelector((state) => state.user.isLogin);

    const onMouseEnter = () => {
        setColor("#FFB17A");
    };

    const onMouseLeave = () => {
        setColor("#808080");
    };

    const onClickButton = async () => {
        if (isLogin) {
            const token = localStorage.getItem("token");
            if (!token) return;
            if (favorite) {
                await fetch("http://localhost:5001/users/favorites/delete", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: token,
                    },
                    body: JSON.stringify({ placeId: props.place.placeId, placeKeyword: props.place.placeKeyword }),
                });
            } else {
                await fetch("http://localhost:5001/users/favorites/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: token,
                    },
                    body: JSON.stringify({ placeId: props.place.placeId, placeKeyword: props.place.placeKeyword }),
                });
            }
            const response = await fetch("http://localhost:5001/users/favorites", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                },
            });
            const data = await response.json();
            dispatch(setFavorites(data));
        }
    };

    return (
        <MarkerFavoriteButtonDiv onClick={onClickButton} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {favorite ? (
                <Favorite sx={{ color: "#FF0000", fontSize: 30 }}></Favorite>
            ) : (
                <FavoriteBorderOutlined sx={{ color: color, fontSize: 30 }}></FavoriteBorderOutlined>
            )}
        </MarkerFavoriteButtonDiv>
    );
};

export default MarkerFavoriteButton;
