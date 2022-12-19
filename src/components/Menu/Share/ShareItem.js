import { NearMe } from "@mui/icons-material";
import { ListItemAvatar, Avatar, ListItemText, ListItem, IconButton, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import useMUIStyles from "styles/MUIStyles";
import { Favorite } from "@mui/icons-material";
import { selectMarker } from "redux/actions/MarkerAction";

const ShareItem = (props) => {
    const classes = useMUIStyles();
    const dispatch = useDispatch();

    const selectedMarker = useSelector((state) => state.markers.selectedMarker);

    const onClickSelect = () => {
        if (!selectedMarker || selectedMarker.placeId !== props.placeId) {
            dispatch(selectMarker(props.placeId));
        }
    };

    return (
        <ListItem
            alignItems="flex-start"
            secondaryAction={
                <Box sx={{ marginRight: 1 }}>
                    <IconButton edge="end" aria-label="select" onClick={onClickSelect}>
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
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Favorite sx={{ color: "#FF0000", fontSize: 25 }}></Favorite>
                                    <Typography sx={{ paddingLeft: "5px" }} component="div" color={"black"}>
                                        {props.favoriteCount}
                                    </Typography>
                                </div>
                            </div>
                        </Box>
                    }
                ></ListItemText>
            </Box>
        </ListItem>
    );
};

ShareItem.propTypes = {
    placeId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewPath: PropTypes.string,
    address: PropTypes.string.isRequired,
    hashTags: PropTypes.arrayOf(PropTypes.string),
    favoriteCount: PropTypes.number.isRequired,
};

export default ShareItem;
