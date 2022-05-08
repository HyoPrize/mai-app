import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Map from "./routes/Map";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={"MAI Main Page"}></Route>
                <Route path="/map" element={<Map />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
