import './trackcard.css';
import { useContext } from "react"
import { PlayerContext } from "../../context/PlayerContext"

export default function TrackCard({ id, name, artist, cover, src }) {

    const {
    playTrack,
    addToFavorites,
    removeFromFavorites,
    favorites,
    currentTrack
    } = useContext(PlayerContext)

    const isFav = favorites.some((t) => t.id === id)
    const isCurrent = currentTrack?.id === id

    const handlePlay = () => {
        playTrack({ id, name, artist, cover, src })
    }

    const handleFav = (e) => {
        e.stopPropagation()

        if (isFav) removeFromFavorites(id)
        else addToFavorites({ id, name, artist, cover, src })
    }

    return(
        <div className={`track-card-big ${isCurrent ? "active" : ""}`} onClick={handlePlay}>
            <img src={`/images/${cover}`} alt="Album cover"/>
            <div className="track-info">
                <h3>{name}</h3>
                <p>{artist}</p>
            </div>
            <button type="button" onClick={handleFav}>
                {isFav ? "❤️" : "🤍"}
            </button>
        </div>
    )
}
