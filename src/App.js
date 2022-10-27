import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GlobalStyle from "./styles/GlobalStyle";
import MapPage from "./routes/Map";
import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "redux/actions/UserAction";

const theme = createTheme({
    typography: {
        fontFamily: "'Roboto', 'Noto', sans-serif",
        fontSize: 15,
        body1: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
        divider: {
            background: "#e3e3e3",
        },
    },
    palette: {
        mai: {
            main: "#ffb17a",
        },
    },
});

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch("http://localhost:5001/users/check", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.isLogin) {
                    const userInfo = data.userInfo;
                    dispatch(login({ userId: userInfo.userId, userEmail: userInfo.userEmail }));
                } else {
                    dispatch(logout());
                    const oldToken = localStorage.getItem("token");
                    if (oldToken) {
                        localStorage.removeItem("token");
                    }
                }
            });
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Router>
                    <Routes>
                        <Route path="/" element={"MAI Main Page"}></Route>
                        <Route path="/map" element={<MapPage />}></Route>
                    </Routes>
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
