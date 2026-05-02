import React, { createContext, useEffect, useState } from "react";
import tracks from "../data/tracks";

const FAVORITES_STORAGE_KEY = "music-player-favorites";
const CURRENT_TRACK_STORAGE_KEY = "music-player-current-track";
const CURRENT_TIME_STORAGE_KEY = "music-player-current-time";
const VOLUME_STORAGE_KEY = "music-player-volume";
const THEME_STORAGE_KEY = "music-player-theme";

const getInitialFavorites = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const getInitialCurrentTrack = () => {
  try {
    const stored = localStorage.getItem(CURRENT_TRACK_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const getInitialCurrentTime = () => {
  try {
    const stored = localStorage.getItem(CURRENT_TIME_STORAGE_KEY);
    return stored ? Number(stored) : 0;
  } catch {
    return 0;
  }
};

const getInitialVolume = () => {
  try {
    const stored = localStorage.getItem(VOLUME_STORAGE_KEY);
    return stored ? Number(stored) : 1;
  } catch {
    return 1;
  }
};

const getInitialTheme = () => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
};

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(getInitialCurrentTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(getInitialVolume);
  const [favorites, setFavorites] = useState(getInitialFavorites);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [playedTracks, setPlayedTracks] = useState([]);
  const [theme, setTheme] = useState(getInitialTheme);
  const [currentTime, setCurrentTime] = useState(getInitialCurrentTime);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore write errors
    }
  }, [favorites]);

  useEffect(() => {
    try {
      if (currentTrack) {
        localStorage.setItem(CURRENT_TRACK_STORAGE_KEY, JSON.stringify(currentTrack));
      } else {
        localStorage.removeItem(CURRENT_TRACK_STORAGE_KEY);
      }
    } catch {
      // ignore write errors
    }
  }, [currentTrack]);

  useEffect(() => {
    try {
      localStorage.setItem(VOLUME_STORAGE_KEY, String(volume));
    } catch {
      // ignore write errors
    }
  }, [volume]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore write errors
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(CURRENT_TIME_STORAGE_KEY, String(currentTime));
    } catch {
      // ignore write errors
    }
  }, [currentTime]);

  // ▶️ Play
  const playTrack = (track) => {
    if (!currentTrack || currentTrack.id !== track.id) {
      if (currentTrack) {
        setPlayedTracks(prev => [currentTrack, ...prev.slice(0, 9)]); // keep last 10
      }
      setCurrentTime(0);
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
        currentTime,
        playTrack,
        pauseTrack,
        nextTrack,
        prevTrack,
        setVolume,
        setCurrentTime,
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