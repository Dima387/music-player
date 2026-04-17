import './App.css'
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Favourites from "./pages/Favourites/Favourites";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PlayerBar from "./components/PlayerBar/PlayerBar";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="src/pages/Home/Home.jsx" element={<Home />} />
        <Route path="src/pages/Search/Search.jsx" element={<Search />} />
        <Route path="src/pages/Favourites/Favourites.jsx" element={<Favourites />} />
      </Routes>

      <PlayerBar />
    </BrowserRouter> 
    </>
  )
}

export default App
