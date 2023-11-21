import "./App.css";
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Video from "./components/Video";
import Work from "./pages/Work";
import ProjectPage from "./pages/ProjectPage";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      {isHomepage && <Video />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:id" element={<ProjectPage />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
