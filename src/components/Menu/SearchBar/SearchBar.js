import { Search } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchText } from "redux/actions/MenuSearchTextAction";

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchText = useSelector((state) => state.searchText.searchText);

    const onChangeSearchText = (e) => {
        dispatch(changeSearchText(e.target.value));
    };

    return (
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <div style={{ margin: "0px 10px 0px 10px", flexGrow: "15" }}>
                <TextField
                    value={searchText}
                    onChange={onChangeSearchText}
                    fullWidth
                    size="small"
                    type="search"
                    id="outlined-basic"
                    variant="outlined"
                    color="mai"
                />
            </div>
            <div style={{ flexGrow: "1" }}>
                <IconButton>
                    <Search />
                </IconButton>
            </div>
        </Box>
    );
};

export default SearchBar;
