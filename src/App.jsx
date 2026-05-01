import './App.css'
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Favourites from "./pages/Favourites/Favourites";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PlayerBar from "./components/PlayerBar/PlayerBar";
import { useContext } from "react";
import { PlayerContext } from "./context/PlayerContext";

function App() {
  const { theme } = useContext(PlayerContext);

  return (
    <div className={`app ${theme}`}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>

      <PlayerBar />
    </div>
  )
}

export default App