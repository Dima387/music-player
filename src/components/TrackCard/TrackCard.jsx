import './trackcard.css';
import { useContext, forwardRef } from "react"
import { PlayerContext } from "../../context/PlayerContext"

const TrackCard = forwardRef(({ id, name, artist, cover }, ref) => {

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
        playTrack({ id, name, artist, cover })
    }

    const handleFav = (e) => {
        e.stopPropagation()

        if (isFav) removeFromFavorites(id)
        else addToFavorites({ id, name, artist, cover })
    }

    return(
        <div ref={ref} className={`track-card-big ${isCurrent ? "active" : ""}`} onClick={handlePlay}>
            <img src={`../../../public/images/${cover}`} alt="Album cover"/>
            <div className="track-info">
                <h3>{name}</h3>
                <p>{artist}</p>
            </div>
            <button onClick={handleFav}>
                {isFav ? "❤️" : "🤍"}
            </button>
        </div>
    )
})

export default TrackCard