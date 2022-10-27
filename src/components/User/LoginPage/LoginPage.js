import { LockOpen } from "@mui/icons-material";
import { Avatar, TextField, Button, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import useMUIStyles from "styles/MUIStyles";
import { resetMenuLevel } from "redux/actions/MenuLevelAction";
import { closeUserToggle } from "redux/actions/UserToggleAction";
import { login } from "redux/actions/UserAction";

async function loginUser(body) {
    return fetch("http://localhost:5001/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }).then((data) => data.json());
}

const LoginPage = (props) => {
    const userPageState = useSelector((state) => state.userPageState.userPageState);

    const classes = useMUIStyles();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser({
            userId: userName,
            userPassword: password,
        });
        if (response.isSuccess) {
            if ("token" in response) {
                swal("Success", response.message, "success", {
                    buttons: false,
                    timer: 2000,
                }).then((value) => {
                    localStorage.setItem("token", response.token);
                    dispatch(login({ userId: response.userId, userEmail: response.userEmail }));
                    dispatch(resetMenuLevel());
                    dispatch(closeUserToggle());
                });
            } else {
                swal("Failed", response.message, "error");
                setUserName("");
                setPassword("");
            }
        } else {
            swal("Failed", response.message, "error");
            setUserName("");
            setPassword("");
        }
    };

    return (
        <div hidden={userPageState !== "login"}>
            <div className={classes.userPage}>
                <Box sx={{ margin: 3 }}>
                    <Avatar sx={{ width: 54, height: 54 }}>
                        <LockOpen fontSize="large" />
                    </Avatar>
                </Box>
                <Typography component="div" variant="h5">
                    로그인
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="UserName"
                        name="사용자명"
                        label="사용자명"
                        color="mai"
                        value={userName || ""}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        name="비밀번호"
                        label="비밀번호"
                        type="password"
                        color="mai"
                        value={password || ""}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" disableElevation color="mai">
                        <b>로그인</b>
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
