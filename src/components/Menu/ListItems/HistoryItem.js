import { Delete, ContentCopy } from "@mui/icons-material";
import { ListItemText, ListItem, IconButton, Box } from "@mui/material";
import PropTypes from "prop-types";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import { deleteHistory } from "redux/actions/HistoryAction";
import useMUIStyles from "styles/MUIStyles";

const HistoryItem = (props) => {
    const classes = useMUIStyles();
    const dispatch = useDispatch();

    const onClickDelete = () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch("http://localhost:5001/users/histories/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: token,
            },
            body: JSON.stringify({ historyNo: props.no }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.isSuccess) {
                    dispatch(deleteHistory(data.historyNo));
                }
            });
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
    no: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    hashTags: PropTypes.arrayOf(PropTypes.string),
    onClickDelete: PropTypes.func,
};

export default HistoryItem;
