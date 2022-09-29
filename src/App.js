import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GlobalStyle from "./styles/GlobalStyle";
import MapPage from "./routes/Map";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: "'Roboto', 'Noto', sans-serif",
        fontSize: 15,
        body1: {
            fontWeight: 600,
        },
        divider: {
            background: "#e3e3e3",
        },
    },
});

function App() {
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
