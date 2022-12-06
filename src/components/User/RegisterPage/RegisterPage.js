import { HowToReg } from "@mui/icons-material";
import { Avatar, TextField, Button, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import useMUIStyles from "styles/MUIStyles";

async function RegisterUser(body) {
    return fetch("http://localhost:5001/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }).then((response) => response.json());
}

const RegisterPage = () => {
    const userPageState = useSelector((state) => state.userPageState.userPageState);

    const classes = useMUIStyles();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            const RegisterData = await RegisterUser({
                userId: userName,
                userEmail: email,
                userPassword: password,
            });
            if ("accessToken" in RegisterData) {
                swal("Success", RegisterData.message, "success", {
                    buttons: false,
                    timer: 2000,
                }).then((value) => {
                    // localStorage.setItem("accessToken", response["accessToken"]);
                    // localStorage.setItem("user", JSON.stringify(response["user"]));
                    // window.location.href = "/profile";
                });
            } else {
                swal("Failed", RegisterData.message, "error");
            }
        } else {
            swal("Failed", "'비밀번호'와 '비밀번호 확인'이 일치하지 않습니다.", "error");
        }
    };

    return (
        <div hidden={userPageState !== "register"}>
            <div className={classes.userPage}>
                <Box sx={{ margin: 3 }}>
                    <Avatar sx={{ width: 54, height: 54 }}>
                        <HowToReg fontSize="large" />
                    </Avatar>
                </Box>
                <Typography component="div" variant="h5">
                    회원가입
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        name="사용자명"
                        label="사용자명"
                        color="mai"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        name="이메일"
                        label="이메일"
                        color="mai"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstPassword"
                        name="비밀번호"
                        label="비밀번호"
                        type="password"
                        color="mai"
                        autoComplete="on"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="confirmPassword"
                        name="비밀번호 확인"
                        label="비밀번호 확인"
                        type="password"
                        color="mai"
                        autoComplete="on"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" disableElevation color="mai">
                        <b>가입하기</b>
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
