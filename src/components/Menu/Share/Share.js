import { Scrollbars } from "react-custom-scrollbars-2";
import { List } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setShares } from "redux/actions/ShareAction";
import ShareItem from "./ShareItem";

const Share = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.user.isLogin);
    const shares = useSelector((state) => state.share.shares);

    useEffect(() => {
        if (isLogin) {
            const token = localStorage.getItem("token");
            if (!token) return;
            fetch("http://localhost:5001/shares?length=10", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    dispatch(setShares(data));
                });
        }
    }, [isLogin]);

    return (
        <Scrollbars style={{ position: "absolute", height: "auto", top: "130px", bottom: "0px" }}>
            <List>
                {shares
                    ? shares.map((share) => (
                          <ShareItem
                              key={`share${share.placeId}`}
                              placeId={share.placeId}
                              name={share.placeName}
                              previewPath={`http://localhost.com/places/image?no=${share.placeId}`}
                              address={share.placeAddress}
                              hashTags={share.placeHashtags.slice(0, 3)}
                              favoriteCount={share.placefavoriteCount}
                          ></ShareItem>
                      ))
                    : null}
            </List>
        </Scrollbars>
    );
};

export default Share;
