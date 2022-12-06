import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const CircularProgressWithLabelAndTooltip = React.forwardRef(function test(props, ref) {
    return (
        <div {...props} ref={ref}>
            <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress sx={{ color: "#FFB17A" }} variant="determinate" {...props} />
                <Box
                    sx={{
                        top: 2,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography sx={{ fontWeight: "600", fontSize: "13px" }} component="div" color="#FFB17A">
                        {`${Math.round(props.value)}점`}
                    </Typography>
                </Box>
            </Box>
        </div>
    );
});

export default CircularProgressWithLabelAndTooltip;
