import CircleModeControl from "./CircleModeControl";
import TransparencyControl from "./TransparencyControl";

function ControlGroup(props) {
    return (
        <>
            <CircleModeControl setIsDrawing={props.setIsDrawing}></CircleModeControl>
            <TransparencyControl></TransparencyControl>
        </>
    );
}

export default ControlGroup;
