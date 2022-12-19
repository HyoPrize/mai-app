import { Delete, NearMe } from "@mui/icons-material";
import { ListItemAvatar, Avatar, ListItemText, ListItem, IconButton, Box } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "redux/actions/FavoriteAction";
import { selectMarker } from "redux/actions/MarkerAction";
import useMUIStyles from "styles/MUIStyles";

const FavoriteItem = (props) => {
    const classes = useMUIStyles();
    const dispatch = useDispatch();

    const selectedMarker = useSelector((state) => state.markers.selectedMarker);

    const onClickDelete = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        await fetch("http://localhost:5001/users/favorites/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: token,
            },
            body: JSON.stringify({ placeId: props.placeId }),
        });
        const response = await fetch("http://localhost:5001/users/favorites", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: token,
            },
        });
        const data = await response.json();
        dispatch(setFavorites(data));
    };

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
                    <IconButton edge="start" aria-label="delete" onClick={onClickDelete}>
                        <Delete />
                    </IconButton>
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

FavoriteItem.propTypes = {
    placeId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewPath: PropTypes.string,
    address: PropTypes.string.isRequired,
    hashTags: PropTypes.arrayOf(PropTypes.string),
};

export default FavoriteItem;
