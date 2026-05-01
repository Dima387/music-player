import { useRef, useEffect, useState } from 'react';
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

    const headingRef = useRef(null)
    const [isScrolling, setIsScrolling] = useState(false)

    useEffect(() => {
        if (headingRef.current) {
            const isOverflowing = headingRef.current.scrollWidth > headingRef.current.clientWidth
            setIsScrolling(isOverflowing)
        }
    }, [name])

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
                <h3 ref={headingRef} className={isScrolling ? "scrolling" : ""}>{name}</h3>
                <div className="text-gradient-overlay"></div>
                <p>{artist}</p>
            </div>
            <div className="favorite-btn">
                <button type="button" onClick={handleFav}>
                    {isFav ? "❤️" : "🤍"}
                </button>
                <p>Додати у вибране</p>
            </div>
        </div>
    )
}
