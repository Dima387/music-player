import React, { createContext, useState } from "react";
import tracks from "../data/tracks";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [playedTracks, setPlayedTracks] = useState([]);
  const [theme, setTheme] = useState('light');

  // ▶️ Play
  const playTrack = (track) => {
    if (currentTrack && currentTrack.id !== track.id) {
      setPlayedTracks(prev => [currentTrack, ...prev.slice(0, 9)]); // keep last 10
    }
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

    let next;
    if (shuffle) {
      const availableTracks = tracks.filter(t => t.id !== currentTrack.id);
      if (availableTracks.length === 0) return; // only one track
      next = availableTracks[Math.floor(Math.random() * availableTracks.length)];
    } else {
      const idx = tracks.findIndex(t => t.id === currentTrack.id);
      next = tracks[(idx + 1) % tracks.length];
    }
    playTrack(next);
  };

  // ⏮ Prev
  const prevTrack = () => {
    if (!currentTrack) return;

    let prev;
    if (shuffle && playedTracks.length > 0) {
      prev = playedTracks[0];
      setPlayedTracks(prev => prev.slice(1));
    } else {
      const idx = tracks.findIndex(t => t.id === currentTrack.id);
      prev = tracks[(idx - 1 + tracks.length) % tracks.length];
    }
    setCurrentTrack(prev);
    setIsPlaying(true);
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

  // 🔀 Toggle shuffle
  const toggleShuffle = () => {
    setShuffle(prev => {
      const newShuffle = !prev;
      if (newShuffle) setRepeat(false);
      return newShuffle;
    });
  };

  // ↻ Toggle repeat
  const toggleRepeat = () => {
    setRepeat(prev => {
      const newRepeat = !prev;
      if (newRepeat) setShuffle(false);
      return newRepeat;
    });
  };

  // 🌙 Toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return React.createElement(
    PlayerContext.Provider,
    {
      value: {
        currentTrack,
        isPlaying,
        volume,
        favorites,
        repeat,
        shuffle,
        tracks,
        theme,
        playTrack,
        pauseTrack,
        nextTrack,
        prevTrack,
        setVolume,
        addToFavorites,
        removeFromFavorites,
        toggleShuffle,
        toggleRepeat,
        toggleTheme,
      },
    },
    children
  );
};