import { Scrollbars } from "react-custom-scrollbars-2";
import { List } from "@mui/material";
import PlaceItem from "../ListItems/PlaceItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteFavorite, setFavorites } from "redux/actions/FavoriteAction";

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
                          .filter((favorite) => favorite.favoriteString.includes(searchText))
                          .map((favorite) => (
                              <PlaceItem
                                  key={`favorite${favorite.favoriteNo}`}
                                  no={favorite.favoriteNo}
                                  name={favorite.favoriteName}
                                  previewPath={`http://localhost.com/favorites/image?no=${favorite.favoriteNo}`}
                                  address={favorite.favoriteAddress}
                                  hashTags={favorite.favoriteHashtags}
                                  onClickDelete={deleteFavorite}
                              ></PlaceItem>
                          ))
                    : null}
            </List>
        </Scrollbars>
    );
};

export default Favorite;
