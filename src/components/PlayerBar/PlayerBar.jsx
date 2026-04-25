import { useEffect, useRef, useContext, useState } from "react"
import { PlayerContext } from "../../context/PlayerContext"
import PlayerControls from "../PlayerControls/PlayerControls"
import ProgressBar from "../ProgressBar/ProgressBar"
import VolumeControl from "../VolumeControl/VolumeControl"
import './PlayerBar.css'

function PlayerBar() {
  const audioRef = useRef(null)
  const [currTime, setCurrTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [muted, setMuted] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)

  const {
    currentTrack,
    isPlaying,
    volume,
    pauseTrack,
    playTrack,
    nextTrack,
    prevTrack,
    setVolume,
  } = useContext(PlayerContext)

  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current
    if (!currentTrack) {
      audio.pause()
      setCurrTime(0)
      setDuration(0)
      return
    }

    audio.src = `/audio/${currentTrack.src}`
    audio.load()
    setCurrTime(0)
    setDuration(0)

    if (isPlaying) {
      audio
        .play()
        .catch((e) => console.warn("Autoplay blocked:", e))
    }
  }, [currentTrack])

  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current
    if (isPlaying) {
      audio
        .play()
        .catch((e) => console.warn("Play error:", e))
    } else {
      audio.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.muted = muted
  }, [muted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => setCurrTime(audio.currentTime)
    const onLoadedMetadata = () => setDuration(audio.duration || 0)
    const onEnded = () => {
      if (repeat) {
        audio.currentTime = 0
        audio.play().catch((e) => console.warn(e))
      } else {
        nextTrack()
      }
    }

    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("loadedmetadata", onLoadedMetadata)
    audio.addEventListener("ended", onEnded)

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("loadedmetadata", onLoadedMetadata)
      audio.removeEventListener("ended", onEnded)
    }
  }, [nextTrack, repeat])

  const handleTogglePlay = () => {
    if (!currentTrack) return
    if (isPlaying) pauseTrack()
    else playTrack(currentTrack)
  }

  const handleSeek = (time) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = time
    setCurrTime(time)
  }

  const handleVolume = (value) => {
    setVolume(value)
    if (muted && value > 0) setMuted(false)
  }

  const handleMute = () => {
    if (!audioRef.current) return
    const nextState = !audioRef.current.muted
    audioRef.current.muted = nextState
    setMuted(nextState)
  }

  const handleShuffle = () => setShuffle((prev) => !prev)
  const handleRepeat = () => {
    if (!audioRef.current || !currentTrack) return
    
    // Restart the current track from the beginning
    audioRef.current.currentTime = 0
    if (!isPlaying) {
      playTrack(currentTrack)
    } else {
      audioRef.current.play().catch((e) => console.warn("Play error:", e))
    }
  }
  const handleNext = () => nextTrack()
  const handlePrev = () => prevTrack()

  const trackTitle = currentTrack?.name ?? "No track selected"
  const trackArtist = currentTrack?.artist ?? "Select a track to play"
  const coverUrl = currentTrack?.cover ? `/images/${currentTrack.cover}` : null

  return (
    <div className="player-bar">
      <div className="player-bar__meta">
        <div className="player-bar__track">
          {coverUrl && <img className="player-bar__cover" src={coverUrl} alt={`${trackTitle} cover`} />}
          <div className="player-bar__text">
            <h3>{trackTitle}</h3>
            <p>{trackArtist}</p>
          </div>
        </div>
      </div>

      <div className="player-bar__body">
        <PlayerControls
          onShuffle={handleShuffle}
          onPrevious={handlePrev}
          onTogglePlay={handleTogglePlay}
          onNext={handleNext}
          onRepeat={handleRepeat}
          isPlaying={isPlaying}
        />

        <ProgressBar
          currTime={currTime}
          duration={duration}
          onSeek={handleSeek}
        />

        <VolumeControl
          min={0}
          max={1}
          value={volume}
          onChange={handleVolume}
          onMute={handleMute}
          muted={muted}
        />
      </div>

      <audio ref={audioRef} preload="metadata" onError={() => console.warn("Audio load error")} />
    </div>
  )
}

export default PlayerBar