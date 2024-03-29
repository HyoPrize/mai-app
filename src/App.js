import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chart from "chart.js/auto";
import GlobalStyle from "./styles/GlobalStyle";
import MapPage from "./routes/MapPage";
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

Chart.defaults.font.family = "Roboto";
Chart.defaults.font.size = 16;
Chart.defaults.font.weight = "bold";
Chart.defaults.color = "#000000";
Chart.defaults.scale.ticks.stepSize = 1;

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
                    dispatch(login({ userNo: data.userNo, userId: data.userId, userEmail: data.userEmail }));
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
