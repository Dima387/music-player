import { useContext } from "react"
import TrackListItem from "../../components/TrackListItem/TrackListItem"
import { PlayerContext } from "../../context/PlayerContext"
import './favourites.css';

export default function Favourites() {
    const { favorites } = useContext(PlayerContext)

    if (!favorites || favorites.length === 0) {
        return (
            <div className="favourites-page">
                <h1>Favourites</h1>
                <p>Список порожній</p>
            </div>
        )
    }

    return (
        <div className="favourites-page">
            <h1>Favourites</h1>
            <div className="tracks-list">
                {favorites.map(t => (
                    <TrackListItem key={t.id} track={t} />
                ))}
            </div>
        </div>
    )
}