import { Delete, NearMe } from "@mui/icons-material";
import { ListItemAvatar, Avatar, ListItemText, ListItem, IconButton, Box } from "@mui/material";
import PropTypes from "prop-types";
import useMUIStyles from "styles/MUIStyles";

const PlaceItem = (props) => {
    const classes = useMUIStyles();

    return (
        <ListItem
            alignItems="flex-start"
            secondaryAction={
                <Box sx={{ marginRight: 1 }}>
                    <IconButton edge="start" aria-label="delete">
                        <Delete />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                        <NearMe />
                    </IconButton>
                </Box>
            }
        >
            <ListItemAvatar>
                <Avatar alt={props.name} src={props.previewPath}></Avatar>
            </ListItemAvatar>
            <Box className={classes.noDragText} sx={{ marginRight: 6, overflow: "hidden", whiteSpace: "nowrap" }}>
                <ListItemText
                    primary={props.name}
                    secondaryTypographyProps={{ component: "div" }}
                    secondary={
                        <Box>
                            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{props.address}</div>
                            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                                {props.hashTags.map((hashTag, index) => (
                                    <span key={index}>#{hashTag} </span>
                                ))}
                            </div>
                        </Box>
                    }
                ></ListItemText>
            </Box>
        </ListItem>
    );
};

PlaceItem.propTypes = {
    name: PropTypes.string.isRequired,
    previewPath: PropTypes.string,
    address: PropTypes.string.isRequired,
    hashTags: PropTypes.arrayOf(PropTypes.string),
};

export default PlaceItem;
