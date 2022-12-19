import { HowToReg } from "@mui/icons-material";
import { Avatar, Button, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import useMUIStyles from "styles/MUIStyles";
import { resetMenuLevel } from "redux/actions/MenuLevelAction";
import { closeUserToggle } from "redux/actions/UserToggleAction";
import { closeUserPage } from "redux/actions/UserPageStateAction";
import StyledTextField from "components/Custom/StyledTextField";

async function RegisterUser(body) {
    return fetch("http://localhost:5001/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }).then((response) => response.json());
}

const RegisterPage = () => {
    const classes = useMUIStyles();
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailValidMode, setEmailValidMode] = useState(0); // 0: 인증 전 / 1: 인증 중 / 2: 인증 완료
    const [validCode, setValidCode] = useState(null);
    const [myCode, setMyCode] = useState("");

    const dispatch = useDispatch();
    const userPageState = useSelector((state) => state.userPageState.userPageState);

    useEffect(() => {
        setEmail("");
        setUserId("");
        setPassword("");
        setConfirmPassword("");
        setEmailValidMode(0);
        setValidCode(null);
        setMyCode("");
    }, [userPageState]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            const RegisterData = await RegisterUser({
                userId: userId,
                userEmail: email,
                userPassword: password,
            });
            if (RegisterData.isSuccess) {
                swal("Success", RegisterData.message, "success", {
                    buttons: false,
                    timer: 2000,
                }).then((value) => {
                    dispatch(resetMenuLevel());
                    dispatch(closeUserToggle());
                    dispatch(closeUserPage());
                });
            } else {
                swal("Failed", RegisterData.message, "error");
            }
        } else {
            swal("Failed", "'비밀번호'와 '비밀번호 확인'이 일치하지 않습니다.", "error");
        }
    };

    const onClickSendCode = () => {
        if (email) {
            setValidCode(null);
            setEmailValidMode(1);
            fetch("http://localhost:5001/users/valid-mail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                }),
            })
                .then((response) => response.json())
                .then((validCode) => setValidCode(String(validCode)));
        }
    };

    const onClickInit = () => {
        setValidCode("");
        setMyCode("");
        setEmailValidMode(0);
        setEmail("");
    };

    const onClickValid = () => {
        if (validCode.length === 6 && myCode.length === 6 && validCode === myCode) {
            setEmailValidMode(2);
        } else {
            swal("Failed", "'인증코드'가 일치하지 않습니다.", "error");
        }
    };

    const switchRender = () => {
        switch (emailValidMode) {
            case 0:
                return (
                    <>
                        <StyledTextField
                            id="email"
                            name="이메일"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            sx={{ fontWeight: "700" }}
                            onClick={onClickSendCode}
                            fullWidth
                            variant="contained"
                            disableElevation
                            color="mai"
                        >
                            인증코드 발송
                        </Button>
                    </>
                );
            case 1:
                return (
                    <>
                        <StyledTextField
                            disabled
                            id="email"
                            name="이메일"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <StyledTextField
                            id="myCode"
                            name="인증코드"
                            value={myCode}
                            onChange={(e) => setMyCode(e.target.value)}
                        />
                        <div style={{ display: "flex", width: "100%" }}>
                            <Button
                                sx={{ boxSizing: "border-box", marginRight: "5px", fontWeight: "700" }}
                                fullWidth
                                variant="contained"
                                disableElevation
                                color="mai"
                                onClick={onClickValid}
                            >
                                인증코드 확인
                            </Button>
                            <Button
                                sx={{ boxSizing: "border-box", marginLeft: "5px", fontWeight: "700" }}
                                fullWidth
                                variant="contained"
                                disableElevation
                                color="mai"
                                onClick={onClickInit}
                            >
                                인증코드 재발송
                            </Button>
                        </div>
                    </>
                );
            case 2:
                return (
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <StyledTextField
                            disabled
                            id="email"
                            name="이메일"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <StyledTextField
                            id="userId"
                            name="아이디"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <StyledTextField
                            type="password"
                            id="firstPassword"
                            name="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <StyledTextField
                            type="password"
                            id="confirmPassword"
                            name="비밀번호 확인"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button
                            sx={{ fontWeight: "700" }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            disableElevation
                            color="mai"
                        >
                            가입하기
                        </Button>
                    </form>
                );
            default:
                return;
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
                {switchRender()}
            </div>
        </div>
    );
};

export default RegisterPage;
