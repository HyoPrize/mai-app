import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const StyledTextField = (props) => {
    return (
        <TextField
            {...props}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={props.id}
            name={props.name}
            label={props.name}
            color="mai"
            value={props.value || ""}
            onChange={props.onChange}
        />
    );
};

StyledTextField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

export default StyledTextField;
