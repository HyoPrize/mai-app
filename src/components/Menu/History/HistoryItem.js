import { Delete, ContentCopy } from "@mui/icons-material";
import { ListItemText, ListItem, IconButton, Box } from "@mui/material";
import PropTypes from "prop-types";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import { setHistories } from "redux/actions/HistoryAction";
import useMUIStyles from "styles/MUIStyles";

const HistoryItem = (props) => {
    const classes = useMUIStyles();
    const dispatch = useDispatch();

    const onClickDelete = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        await fetch("http://localhost:5001/users/histories/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: token,
            },
            body: JSON.stringify({ placeId: props.placeId, placeKeyword: props.placeKeyword }),
        });
        const response = await fetch("http://localhost:5001/users/histories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: token,
            },
        });
        const data = await response.json();
        dispatch(setHistories(data));
    };

    return (
        <ListItem
            alignItems="flex-start"
            secondaryAction={
                <Box sx={{ marginRight: 1 }}>
                    <IconButton edge="start" aria-label="delete" onClick={onClickDelete}>
                        <Delete fontSize="small" />
                    </IconButton>
                    <CopyToClipboard text={props.name + props.hashTags.join("")}>
                        <IconButton edge="end" aria-label="delete">
                            <ContentCopy fontSize="small" />
                        </IconButton>
                    </CopyToClipboard>
                </Box>
            }
        >
            <Box className={classes.noDragText} sx={{ marginRight: 6, overflow: "hidden", whiteSpace: "nowrap" }}>
                <ListItemText
                    primary={
                        <>
                            <span> #{props.name} </span>
                            {props.hashTags.map((hashTag, index) => (
                                <span key={index}>#{hashTag} </span>
                            ))}
                        </>
                    }
                ></ListItemText>
            </Box>
        </ListItem>
    );
};

HistoryItem.propTypes = {
    placeId: PropTypes.number.isRequired,
    placeKeyword: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    hashTags: PropTypes.arrayOf(PropTypes.string),
};

export default HistoryItem;
