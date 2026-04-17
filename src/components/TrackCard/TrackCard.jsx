import { useContext } from "react"
import { PlayerContext } from "../../context/PlayerContext"
import "./TrackCard.css"

function TrackCard({ track }) {
  const {
    playTrack,
    addToFavorites,
    removeFromFavorites,
    favorites,
    currentTrack
  } = useContext(PlayerContext)

  const isFav = favorites.some((t) => t.id === track.id)
  const isCurrent = currentTrack?.id === track.id

  const handlePlay = () => {
    playTrack(track)
  }

  const handleFav = (e) => {
    e.stopPropagation()

    if (isFav) removeFromFavorites(track.id)
    else addToFavorites(track)
  }

  return (
    <div
      className={`track-card ${isCurrent ? "active" : ""}`}
      onClick={handlePlay}
    >
      <h3>{track.name}</h3>
      <p>{track.artist}</p>

      <button onClick={handleFav}>
        {isFav ? "❤️" : "🤍"}
      </button>
    </div>
  )
}