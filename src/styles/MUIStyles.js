import { makeStyles } from "@mui/styles";

const useMUIStyles = makeStyles((theme) => ({
    noDragText: {
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
    },
    divider: {
        background: "#ffb17a",
    },
    customStyleOnTab: {
        fontWeight: "600",
        color: "black",
    },
    activeTab: {
        fontWeight: "600",
        color: "#ffb17a",
    },
    textField: {
        color: "#ffb17a",
    },
}));

export default useMUIStyles;
