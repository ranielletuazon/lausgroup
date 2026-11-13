import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import CompanyProfile from "./pages/CompanyProfile";
import MissionVision from "./pages/MissionVision";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/about-us/company-profile"
                        element={<CompanyProfile />}
                    />
                    <Route
                        path="/about-us/mission-vision"
                        element={<MissionVision />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
