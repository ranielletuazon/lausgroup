import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Data
import { foodGroup, motorbikes } from "./assets/data";

// Pages
import Home from "./pages/Home";
import CompanyProfile from "./pages/CompanyProfile";
import MissionVision from "./pages/MissionVision";
import AboutFounder from "./pages/AboutFounder";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/ContactUs";
import NewsEvents from "./pages/NewsEvents";
import AffiliatePage from "./pages/AffiliatePage";
import FoodGroupPage from "./pages/FoodGroupPage";
import MotorbikePage from "./pages/MotorbikePage";

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
                    <Route
                        path="/about-us/about-the-founder"
                        element={<AboutFounder />}
                    />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/news-and-events" element={<NewsEvents />} />

                    {/* Food group pages: one route per restaurant in foodgroups.json */}
                    {foodGroup.map((restaurant) => (
                        <Route
                            key={restaurant.href}
                            path={restaurant.href}
                            element={<FoodGroupPage />}
                        />
                    ))}

                    {/* Motorbike pages: one route per dealership in motorbikes.json */}
                    {motorbikes.map((dealership) => (
                        <Route
                            key={dealership.href}
                            path={dealership.href}
                            element={<MotorbikePage />}
                        />
                    ))}

                    {/* Affiliate pages: /laus-auto-finance, /huper-optik, ... */}
                    <Route path="/:slug" element={<AffiliatePage />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
