import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GlobalStyle from "./styles/GlobalStyle";
import MapPage from "./routes/Map";

function App() {
    return (
        <>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route path="/" element={"MAI Main Page"}></Route>
                    <Route path="/map" element={<MapPage />}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
