import { Scrollbars } from "react-custom-scrollbars-2";
import { List } from "@mui/material";
import FavoriteItem from "./FavoriteItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setFavorites } from "redux/actions/FavoriteAction";

const Favorite = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.user.isLogin);
    const favorites = useSelector((state) => state.favorite.favorites);
    const searchText = useSelector((state) => state.searchText.searchText);

    useEffect(() => {
        if (isLogin) {
            const token = localStorage.getItem("token");
            if (!token) return;
            fetch("http://localhost:5001/users/favorites", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    dispatch(setFavorites(data));
                });
        }
    }, [isLogin]);

    return (
        <Scrollbars style={{ position: "absolute", height: "auto", top: "130px", bottom: "0px" }}>
            <List>
                {favorites
                    ? favorites
                          .filter((favorite) => favorite.placeString.includes(searchText))
                          .map((favorite) => (
                              <FavoriteItem
                                  key={`favorite${favorite.placeId}`}
                                  placeId={favorite.placeId}
                                  name={favorite.placeName}
                                  previewPath={`http://localhost.com/places/image?no=${favorite.placeId}`}
                                  address={favorite.placeAddress}
                                  hashTags={favorite.placeHashtags.slice(0, 3)}
                              ></FavoriteItem>
                          ))
                    : null}
            </List>
        </Scrollbars>
    );
};

export default Favorite;
