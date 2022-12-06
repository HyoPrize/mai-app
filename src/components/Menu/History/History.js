import { List, ListItem } from "@mui/material";
import { useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import { setHistories } from "redux/actions/HistoryAction";
import HistoryItem from "../ListItems/HistoryItem";

const History = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.user.isLogin);
    const histories = useSelector((state) => state.history.histories);
    const searchText = useSelector((state) => state.searchText.searchText);

    useEffect(() => {
        if (isLogin) {
            const token = localStorage.getItem("token");
            if (!token) return;
            fetch("http://localhost:5001/users/histories", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    dispatch(setHistories(data));
                });
        }
    }, [isLogin]);

    return (
        <Scrollbars style={{ position: "absolute", height: "auto", top: "130px", bottom: "0px" }}>
            <List>
                {histories
                    ? histories
                          .filter((history) => history.historyString.includes(searchText))
                          .map((history) => (
                              <HistoryItem
                                  key={`history${history.historyNo}`}
                                  no={history.historyNo}
                                  name={history.historyName}
                                  hashTags={history.historyHashtags}
                              ></HistoryItem>
                          ))
                    : null}
            </List>
        </Scrollbars>
    );
};

export default History;
