import { Slider, Stack } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMainColor, setSubColor } from "redux/actions/ColorAction";
import ControlDiv from "styles/ControlDiv";

const TransparencyControl = () => {
    const dispatch = useDispatch();
    const menuLevel = useSelector((state) => state.menuLevel.menuLevel);
    const [transparency, setTransparency] = useState(80);

    const onChangeTransparency = (event, newValue) => {
        if (typeof newValue === "number") {
            setTransparency(newValue);
            const newTransparency = 50 + newValue * 0.5;
            dispatch(setSubColor(`#FFFDED${newTransparency < 100 ? newTransparency : ""}`));
            dispatch(setMainColor(`#FFB17A${newTransparency < 100 ? newTransparency : ""}`));
        }
    };

    const getPixelFromMenuLevel = () => {
        switch (menuLevel) {
            case 0:
            case 1:
            case 2:
                return "40px";
            case 3:
                return "440px";
            default:
                return "40px";
        }
    };

    return (
        <ControlDiv style={{ width: "200px", right: getPixelFromMenuLevel(), bottom: "15px" }}>
            <Slider
                sx={{ color: "#FFB17A" }}
                value={transparency}
                aria-label="transparency"
                defaultValue={80}
                valueLabelDisplay="auto"
                step={10}
                min={10}
                max={100}
                onChange={onChangeTransparency}
                marks
            ></Slider>
        </ControlDiv>
    );
};

export default TransparencyControl;
