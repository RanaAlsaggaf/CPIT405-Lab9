import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Recipe from "./pages/Recipe.jsx";
import Header from "./components/Header.jsx";


export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<p style={{ padding: 24 }}>Not found.</p>} />
        </Routes>
      </main>
      <footer className="footer">Recipe Finder App | CPIT405 Lab 9</footer>
    </>
  );
}
