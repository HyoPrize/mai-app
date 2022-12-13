import { LockOpen } from "@mui/icons-material";
import { Avatar, TextField, Button, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import useMUIStyles from "styles/MUIStyles";
import { resetMenuLevel } from "redux/actions/MenuLevelAction";
import { closeUserToggle } from "redux/actions/UserToggleAction";
import { login } from "redux/actions/UserAction";
import { closeUserPage } from "redux/actions/UserPageStateAction";

async function loginUser(body) {
    return fetch("http://localhost:5001/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }).then((response) => response.json());
}

const LoginPage = (props) => {
    const classes = useMUIStyles();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [pageMode, setPageMode] = useState(0); // 0: 기본 / 1: 아이디찾기 / 2: 비밀번호찾기
    const [email, setEmail] = useState("");
    const [validCode, setValidCode] = useState(null);
    const [myCode, setMyCode] = useState("");
    const [emailValidMode, setEmailValidMode] = useState(0); // 0: 인증 전 / 1: 인증 중 / 2: 인증 완료
    const [confirmPassword, setConfirmPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const dispatch = useDispatch();
    const userPageState = useSelector((state) => state.userPageState.userPageState);

    let isSubmit = false;

    console.log(userPageState);

    useEffect(() => {
        setUserId("");
        setPassword("");
        setPageMode(0);
        setValidCode(null);
        setMyCode("");
        setEmailValidMode(0);
        setEmail("");
        setConfirmPassword("");
    }, [userPageState]);

    useEffect(() => {
        setUserId("");
        setPassword("");
        setEmail("");
        setValidCode(null);
        setMyCode("");
        setEmailValidMode(0);
        setConfirmPassword("");
    }, [pageMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isSubmit) {
            isSubmit = true;
            const loginData = await loginUser({
                userId: userId,
                userPassword: password,
            });
            if (loginData.isSuccess) {
                if ("token" in loginData) {
                    swal("Success", loginData.message, "success", {
                        buttons: false,
                        timer: 2000,
                    }).then((value) => {
                        localStorage.setItem("token", loginData.token);
                        dispatch(
                            login({
                                userNo: loginData.userNo,
                                userId: loginData.userId,
                                userEmail: loginData.userEmail,
                            })
                        );
                        dispatch(closeUserPage());
                        dispatch(resetMenuLevel());
                        dispatch(closeUserToggle());
                        isSubmit = false;
                    });
                } else {
                    swal("Failed", loginData.message, "error").then((value) => {
                        isSubmit = false;
                        setUserId("");
                        setPassword("");
                    });
                }
            } else {
                swal("Failed", loginData.message, "error").then((value) => {
                    isSubmit = false;
                    setUserId("");
                    setPassword("");
                });
            }
        }
    };

    const onClickSendIdEmail = () => {
        if (email) {
            setButtonDisabled(true);
            fetch("http://localhost:5001/users/id-mail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                }),
            }).then((response) => {
                if (response.ok) {
                    swal("Success", "메일함을 확인해주세요.", "success", {
                        buttons: false,
                        timer: 2000,
                    }).then((value) => {
                        setPageMode(0);
                    });
                } else {
                    swal("Failed", "찾을 수 없는 이메일 입니다. 다시 한번 확인해주세요.", "error");
                }
                setButtonDisabled(false);
            });
        } else {
            swal("Failed", "'이메일'을 입력해주세요.", "error");
        }
    };

    const onClickSendPasswordEmail = async () => {
        if (email && userId) {
            setValidCode(null);
            setButtonDisabled(true);
            const response = await fetch("http://localhost:5001/users/password-mail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    id: userId,
                }),
            });
            if (response.ok) {
                const validCode = await response.json();
                setEmailValidMode(1);
                setValidCode(String(validCode));
            } else {
                swal("Failed", "'아이디'와 '이메일'을 확인해주세요.", "error");
            }
            setButtonDisabled(false);
        } else {
            swal("Failed", "'이메일'와 '이메일'을 확인해주세요.", "error");
        }
    };

    const onClickInit = () => {
        setUserId("");
        setPassword("");
        setEmail("");
        setValidCode(null);
        setMyCode("");
        setEmailValidMode(0);
    };

    const onClickValid = () => {
        if (validCode.length === 6 && myCode.length === 6 && validCode === myCode) {
            setEmailValidMode(2);
        } else {
            swal("Failed", "'인증코드'가 일치하지 않습니다.", "error");
        }
    };

    const onClickChangePassword = async () => {
        if (password.length > 0 && confirmPassword.length > 0 && password === confirmPassword) {
            const response = await fetch("http://localhost:5001/users/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            if (response.ok) {
                swal("Success", "비밀번호를 성공적으로 재설정하였습니다.", "success", {
                    buttons: false,
                    timer: 2000,
                }).then((value) => {
                    dispatch(closeUserPage());
                    dispatch(closeUserToggle());
                    dispatch(resetMenuLevel());
                });
            } else {
                swal("Failed", "'재설정할 비밀번호'와 '재설정할 비밀번호 확인'이 일치하지 않습니다.", "error");
            }
        } else {
            swal("Failed", "'재설정할 비밀번호'와 '재설정할 비밀번호 확인'이 일치하지 않습니다.", "error");
        }
    };

    const switchRender = () => {
        switch (pageMode) {
            case 0:
                return (
                    <>
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
                                id="userId"
                                name="아이디"
                                label="아이디"
                                color="mai"
                                value={userId || ""}
                                onChange={(e) => setUserId(e.target.value)}
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
                                autoComplete="on"
                                value={password || ""}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                sx={{ fontWeight: "700" }}
                                type="submit"
                                fullWidth
                                variant="contained"
                                disableElevation
                                color="mai"
                            >
                                로그인
                            </Button>
                            <div
                                className="clickable-text-hover"
                                style={{ paddingTop: "5px" }}
                                onClick={() => setPageMode(1)}
                            >
                                아이디 찾기
                            </div>
                            <div
                                className="clickable-text-hover"
                                style={{ paddingTop: "5px" }}
                                onClick={() => setPageMode(2)}
                            >
                                비밀번호 찾기
                            </div>
                        </form>
                    </>
                );
            case 1:
                return (
                    <>
                        <Box sx={{ margin: 3 }}>
                            <Avatar sx={{ width: 54, height: 54 }}>
                                <LockOpen fontSize="large" />
                            </Avatar>
                        </Box>
                        <Typography component="div" variant="h5">
                            아이디 찾기
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="이메일"
                            label="이메일"
                            color="mai"
                            value={email || ""}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            sx={{ fontWeight: "700" }}
                            onClick={onClickSendIdEmail}
                            fullWidth
                            variant="contained"
                            disableElevation
                            color="mai"
                            disabled={buttonDisabled}
                        >
                            메일로 아이디 확인
                        </Button>
                    </>
                );
            case 2:
                return (
                    <>
                        <Box sx={{ margin: 3 }}>
                            <Avatar sx={{ width: 54, height: 54 }}>
                                <LockOpen fontSize="large" />
                            </Avatar>
                        </Box>
                        <Typography component="div" variant="h5">
                            비밀번호 찾기
                        </Typography>
                        {emailValidMode === 0 ? (
                            <>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    name="이메일"
                                    label="이메일"
                                    color="mai"
                                    value={email || ""}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="userId"
                                    name="아이디"
                                    label="아이디"
                                    color="mai"
                                    value={userId || ""}
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                                <Button
                                    sx={{ fontWeight: "700" }}
                                    onClick={onClickSendPasswordEmail}
                                    fullWidth
                                    variant="contained"
                                    disableElevation
                                    color="mai"
                                    disabled={buttonDisabled}
                                >
                                    인증코드 발송
                                </Button>
                            </>
                        ) : emailValidMode === 1 ? (
                            <>
                                <TextField
                                    disabled
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    name="이메일"
                                    label="이메일"
                                    color="mai"
                                    value={email || ""}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    disabled
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="userId"
                                    name="아이디"
                                    label="아이디"
                                    color="mai"
                                    value={userId || ""}
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="myCode"
                                    name="인증코드"
                                    label="인증코드"
                                    color="mai"
                                    value={myCode || ""}
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
                        ) : (
                            <>
                                <TextField
                                    disabled
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    name="이메일"
                                    label="이메일"
                                    color="mai"
                                    value={email || ""}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    disabled
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="userId"
                                    name="아이디"
                                    label="아이디"
                                    color="mai"
                                    value={userId || ""}
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstPassword"
                                    name="재설정할 비밀번호"
                                    label="재설정할 비밀번호"
                                    type="password"
                                    color="mai"
                                    autoComplete="on"
                                    value={password || ""}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="confirmPassword"
                                    name="재설정할 비밀번호 확인"
                                    label="재설정할 비밀번호 확인"
                                    type="password"
                                    color="mai"
                                    autoComplete="on"
                                    value={confirmPassword || ""}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <Button
                                    sx={{ fontWeight: "700" }}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disableElevation
                                    color="mai"
                                    onClick={onClickChangePassword}
                                >
                                    비밀번호 재설정
                                </Button>
                            </>
                        )}
                    </>
                );
            default:
                return <div></div>;
        }
    };

    return (
        <div hidden={userPageState !== "login"}>
            <div className={classes.userPage}>{switchRender()}</div>
        </div>
    );
};

export default LoginPage;
