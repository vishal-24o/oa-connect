import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Discussions from "./pages/Discussions";
import DiscussionDetail from "./pages/DiscussionDetail";
import PostDiscussion from "./pages/PostDiscussion";

function AnimatedRoutes() {
  const location = useLocation(); // ✅ CORRECT PLACE

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/discussions/:id" element={<DiscussionDetail />} />
        <Route path="/post" element={<PostDiscussion />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="theme-transition min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
