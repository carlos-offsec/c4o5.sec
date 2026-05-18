import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SobrePage from "./pages/SobrePage";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <HashRouter>
      <div className="scanlines">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
