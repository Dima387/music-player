import { useEffect, useRef, useContext } from "react"
import { PlayerContext } from "../../context/PlayerContext"

function PlayerBar() {
  const audioRef = useRef(null)

  const { currentTrack, isPlaying, volume } = useContext(PlayerContext)

  useEffect(() => {
    if (!currentTrack || !audioRef.current) return

    audioRef.current.src = currentTrack.src

    audioRef.current
      .play()
      .catch((e) => console.warn("Autoplay blocked:", e))
  }, [currentTrack])

  useEffect(() => {
  if (!audioRef.current) return

  if (isPlaying) {
    audioRef.current
      .play()
      .catch((e) => console.warn(e))
  } else {
    audioRef.current.pause()
  }
}, [isPlaying])

useEffect(() => {
  if (!audioRef.current) return

  audioRef.current.volume = volume
}, [volume])
  return (
    <div className="player-bar">
      <audio
        ref={audioRef}
        onError={() => console.warn("Audio load error")}
      />
    </div>
  )
}

export default PlayerBar