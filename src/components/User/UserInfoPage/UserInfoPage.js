import { HowToReg } from "@mui/icons-material";
import { Avatar, Box, TextField, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserImageSrc } from "redux/actions/ImageSrcAction";
import useMUIStyles from "styles/MUIStyles";

const DarkerDisabledTextField = styled(TextField)({
    "& .Mui-disabled": {
        WebkitTextFillColor: "#FFB17A",
        "& input": {
            WebkitTextFillColor: "black",
        },
    },
});

const UserInfoPage = () => {
    const classes = useMUIStyles();
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.user.isLogin);
    const userPageState = useSelector((state) => state.userPageState.userPageState);
    const userInfo = useSelector((state) => state.user.userInfo);
    const userImageSrc = useSelector((state) => state.imageSrc.userImageSrc);

    const fileInput = useRef(null);

    useEffect(() => {
        if (userInfo) {
            dispatch(setUserImageSrc(`http://localhost:5001/users/image?userNo=${userInfo.userNo}`));
        }
    }, [userInfo]);

    const handleAvatarClick = (e) => {
        fileInput.current.click();
    };

    const handleChange = (e) => {
        if (isLogin) {
            const token = localStorage.getItem("token");
            if (!token) return;

            const form = new FormData();
            const file = e.target.files[0];
            form.append("image", file, userInfo.userNo + "." + file.name.split(".")[1]);

            fetch("http://localhost:5001/users/upload", {
                method: "POST",
                headers: {
                    authorization: token,
                },
                body: form,
            }).then((response) => {
                dispatch(setUserImageSrc(`http://localhost:5001/users/image?userNo=${userInfo.userNo}&${Date.now()}`));
            });
        }
    };

    return (
        <div hidden={userPageState !== "userInfo"}>
            {userInfo ? (
                <div className={classes.userPage}>
                    <div style={{ paddingBottom: "40px" }}>
                        <Typography component="div" variant="h5">
                            내정보
                        </Typography>
                    </div>
                    <Tooltip title={"클릭하여 프로필사진을 변경할 수 있습니다."} placement="top" arrow>
                        <Box>
                            <Avatar
                                onClick={handleAvatarClick}
                                src={userImageSrc}
                                sx={{ width: 256, height: 256, cursor: "pointer", backgroundColor: "white" }}
                            >
                                <HowToReg fontSize="large" />
                            </Avatar>
                            <input
                                type="file"
                                ref={fileInput}
                                accept=".png, .jpg"
                                name="image"
                                onChange={handleChange}
                                style={{ display: "none" }}
                            />
                        </Box>
                    </Tooltip>
                    <DarkerDisabledTextField
                        sx={{ color: "black" }}
                        disabled={true}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        name="이메일"
                        label="이메일"
                        color="mai"
                        value={userInfo.userEmail}
                        // onChange={(e) => setUserId(e.target.value)}
                    />
                    <DarkerDisabledTextField
                        disabled
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="userId"
                        name="아이디"
                        label="아이디"
                        color="mai"
                        value={userInfo.userId}
                        // onChange={(e) => setUserId(e.target.value)}
                    />
                    {/* <div style={{ display: "flex", alignItems: "flex-end" }}>
                        <Button
                            sx={{ boxSizing: "border-box", marginRight: "5px", fontWeight: "700" }}
                            variant="contained"
                            disableElevation
                            color="mai"
                        >
                            아이디 변경
                        </Button>
                        <Button
                            sx={{ boxSizing: "border-box", marginLeft: "5px", fontWeight: "700" }}
                            variant="contained"
                            disableElevation
                            color="mai"
                        >
                            비밀번호 변경
                        </Button>
                    </div> */}
                </div>
            ) : null}
        </div>
    );
};

export default UserInfoPage;
