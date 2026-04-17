import './App.css'
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Favourites from "./pages/Favourites/Favourites";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
// import PlayerBar from "./components/PlayerBar/PlayerBar";

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>

      {/* <PlayerBar /> */}
    </>
  )
}

export default App