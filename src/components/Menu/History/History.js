import { List, ListItem } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";
import SearchItem from "../ListItems/SearchItem";

const History = () => {
    return (
        <Scrollbars style={{ position: "absolute", height: "auto", top: "130px", bottom: "0px" }}>
            <List>
                <SearchItem hashTags={["A", "B", "C"]}></SearchItem>
                <SearchItem hashTags={["A", "B", "C"]}></SearchItem>
                <SearchItem hashTags={["A", "B", "C"]}></SearchItem>
                <SearchItem hashTags={["A", "B", "C"]}></SearchItem>
                <SearchItem hashTags={["A", "B", "C"]}></SearchItem>
                <SearchItem hashTags={["A", "B", "C"]}></SearchItem>
                <SearchItem hashTags={["A", "B", "C"]}></SearchItem>
                <SearchItem hashTags={["A", "B", "C"]}></SearchItem>
                <SearchItem hashTags={["A", "B", "C"]}></SearchItem>
                <SearchItem hashTags={["A", "B", "C"]}></SearchItem>
                <SearchItem hashTags={["A", "B", "C"]}></SearchItem>
                <SearchItem hashTags={["A", "B", "C"]}></SearchItem>
                <SearchItem hashTags={["A", "B", "C"]}></SearchItem>
                <SearchItem hashTags={["A", "B", "C"]}></SearchItem>
                <SearchItem hashTags={["A", "B", "C"]}></SearchItem>
                <SearchItem hashTags={["A", "B", "C"]}></SearchItem>
                <SearchItem hashTags={["A", "B", "C"]}></SearchItem>
            </List>
        </Scrollbars>
    );
};

export default History;
