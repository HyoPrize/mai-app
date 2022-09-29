import { Delete, ContentCopy } from "@mui/icons-material";
import { ListItemText, ListItem, IconButton, Box } from "@mui/material";
import PropTypes from "prop-types";
import CopyToClipboard from "react-copy-to-clipboard";
import useMUIStyles from "styles/MUIStyles";

const SearchItem = (props) => {
    const classes = useMUIStyles();

    return (
        <ListItem
            alignItems="flex-start"
            secondaryAction={
                <Box sx={{ marginRight: 1 }}>
                    <IconButton edge="start" aria-label="delete">
                        <Delete fontSize="small" />
                    </IconButton>
                    <CopyToClipboard text={props.hashTags.join(",")}>
                        <IconButton edge="end" aria-label="delete">
                            <ContentCopy fontSize="small" />
                        </IconButton>
                    </CopyToClipboard>
                </Box>
            }
        >
            <Box className={classes.noDragText} sx={{ marginRight: 6, overflow: "hidden", whiteSpace: "nowrap" }}>
                <ListItemText
                    primary={props.hashTags.map((hashTag, index) => (
                        <span key={index}>#{hashTag} </span>
                    ))}
                ></ListItemText>
            </Box>
        </ListItem>
    );
};

SearchItem.propTypes = {
    hashTags: PropTypes.arrayOf(PropTypes.string),
};

export default SearchItem;
