import React, { createContext, useState } from "react";
import tracks from "../data/tracks";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [favorites, setFavorites] = useState([]);

  // ▶️ Play
  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  // ⏸ Pause
  const pauseTrack = () => {
    setIsPlaying(false);
  };

  // ⏭ Next
  const nextTrack = () => {
    if (!currentTrack) return;

    const idx = tracks.findIndex(t => t.id === currentTrack.id);
    const next = tracks[(idx + 1) % tracks.length];
    setCurrentTrack(next);
  };

  // ⏮ Prev
  const prevTrack = () => {
    if (!currentTrack) return;

    const idx = tracks.findIndex(t => t.id === currentTrack.id);
    const prev = tracks[(idx - 1 + tracks.length) % tracks.length];
    setCurrentTrack(prev);
  };

  // 🔊 Volume
  const setVolume = (v) => {
    setVolumeState(v);
  };

  // ❤️ Add to favorites
  const addToFavorites = (track) => {
    setFavorites(prev => [...prev, track]);
  };

  // ❌ Remove from favorites
  const removeFromFavorites = (id) => {
    setFavorites(prev => prev.filter(t => t.id !== id));
  };

  return React.createElement(
    PlayerContext.Provider,
    {
      value: {
        currentTrack,
        isPlaying,
        volume,
        favorites,
        playTrack,
        pauseTrack,
        nextTrack,
        prevTrack,
        setVolume,
        addToFavorites,
        removeFromFavorites,
      },
    },
    children
  );
};