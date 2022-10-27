import { Delete, ContentCopy } from "@mui/icons-material";
import { ListItemText, ListItem, IconButton, Box } from "@mui/material";
import PropTypes from "prop-types";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import useMUIStyles from "styles/MUIStyles";

const SearchItem = (props) => {
    const classes = useMUIStyles();
    const dispatch = useDispatch();

    const onClickDelete = () => {
        dispatch(props.onClickDelete(props.no));
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

SearchItem.propTypes = {
    no: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    hashTags: PropTypes.arrayOf(PropTypes.string),
    onClickDelete: PropTypes.func,
};

export default SearchItem;
